import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Product.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import ProductCard from '../../components/ProductCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useState } from 'react';
import { CategoryType, MetaType, ProductType, SubCategoryType } from '../../helper/types';
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
    const [meta, setMeta] = useState<MetaType|undefined>(undefined)
    const { data:categoryData, isLoading:isCategoryLoading } = useSWR<{category: CategoryType}>(category_slug ? api_routes.categories + `/${category_slug}` : null);
    const { data:subCategoryData, isLoading:isSubCategoryLoading } = useSWR<{subCategory: SubCategoryType}>(sub_category_slug ? api_routes.sub_categories + `/${sub_category_slug}` : null);
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => {
        setMeta(res.data.meta)
        return res.data.data
    });
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
    } = useSWRInfinite<ProductType>(getKey, fetcher,{
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
                            (data ? data.flat(): []).map((item, i) => <IonCol
                                size="6"
                                size-xl="3"
                                size-lg="3"
                                size-md="4"
                                size-sm="6"
                                size-xs="6"
                                key={i}
                            >
                                <ProductCard image={item.image} link={`/product-detail/${item.id}`} text={item.name} />
                            </IonCol>)
                        }
                    </IonRow>
                </IonGrid>
                {
                    (isLoading || isCategoryLoading || isSubCategoryLoading) && <LoadingCard itemCount={6} column={6} />
                }
                {
                    (meta && meta.current_page!==meta.last_page) && <LoadMoreButton clickHandler={()=>setSize(size+1)} />
                }
            </IonContent>
        </IonPage>
    );
};

export default Product;
