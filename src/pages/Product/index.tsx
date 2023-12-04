import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Product.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import ProductCard from '../../components/ProductCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback } from 'react';
import { CategoryType, ProductResponseType, SubCategoryType } from '../../helper/types';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import LoadingCard from '../../components/LoadingCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import { useLocation } from 'react-router';
import useSWR from 'swr'

const PAGE_SIZE = 20;

const Product: React.FC = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const category_slug = query.get('category_slug')
    const sub_category_slug = query.get('sub_category_slug')
    const axiosPrivate = useAxiosPrivate();
    const { data:categoryData, isLoading:isCategoryLoading } = useSWR<{category: CategoryType}>(category_slug ? api_routes.categories + `/${category_slug}` : null);
    const { data:subCategoryData, isLoading:isSubCategoryLoading } = useSWR<{subCategory: SubCategoryType}>(sub_category_slug ? api_routes.sub_categories + `/${sub_category_slug}` : null);
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if(!categoryData && !subCategoryData) return null;
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.products}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id${categoryData ? '&filter[has_categories]='+categoryData.category.id : ''}${subCategoryData ? '&filter[has_sub_categories]='+subCategoryData.subCategory.id : ''}`;
    }, [categoryData, subCategoryData])
    
    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<ProductResponseType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    return (
        <IonPage>
            <MainHeader isMainHeader={false} name={categoryData ? categoryData.category.name : subCategoryData ? subCategoryData.subCategory.name: 'Products'} />
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            >
                <CommonHeading text={categoryData ? categoryData.category.name : subCategoryData ? subCategoryData.subCategory.name: 'Our Products'} />
                <IonGrid>
                    <IonRow className="ion-align-items-center ion-justify-content-between">
                        {
                            (data ? data: []).map((item, i) => item.data.map((itm, index) => <IonCol
                            size="6"
                            size-xl="3"
                            size-lg="3"
                            size-md="4"
                            size-sm="6"
                            size-xs="6"
                            key={index}
                        >
                            <ProductCard image={itm.image} link={`/product-detail/${itm.id}`} text={itm.name} />
                        </IonCol>))
                        }
                    </IonRow>
                </IonGrid>
                {
                    (isLoading || isCategoryLoading || isSubCategoryLoading) && <LoadingCard itemCount={6} column={6} />
                }
                {
                    (data && data[data.length-1].meta && data[data.length-1].meta.current_page!==data[data.length-1].meta.last_page) && <LoadMoreButton clickHandler={()=>setSize(size+1)} />
                }
            </IonContent>
        </IonPage>
    );
};

export default Product;
