import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './SubCategory.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import { CategoryType, SubCategoryResponseType } from '../../helper/types';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback } from 'react';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import LoadingCard from '../../components/LoadingCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import { useLocation } from 'react-router';
import useSWR from 'swr'

const PAGE_SIZE = 20;

const SubCategory: React.FC = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const category_slug = query.get('category_slug')
    const axiosPrivate = useAxiosPrivate();
    const { data:categoryData, isLoading:isCategoryLoading } = useSWR<{category: CategoryType}>(category_slug ? api_routes.categories + `/${category_slug}` : null);
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.sub_categories}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id${categoryData ? '&filter[has_categories]='+categoryData.category.id : ''}`;
    }, [categoryData])

    
    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<SubCategoryResponseType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    return (
        <IonPage>
            <MainHeader isMainHeader={false} name={categoryData ? categoryData.category.name : 'Sub Category'} />
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            >
                <CommonHeading text={categoryData ? categoryData.category.name : 'Sub Category'} />
                <IonGrid>
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                        {
                            (data ? data: []).map((item, i) => item.data.map((itm, index) => <IonCol
                            size="4"
                            size-xl="3"
                            size-lg="3"
                            size-md="4"
                            size-sm="4"
                            size-xs="4"
                            key={index}
                        >
                            <CategoryCard image={itm.image} link={`/product?sub_category_slug=${itm.slug}`} text={itm.name} />
                        </IonCol>))
                        }
                    </IonRow>
                </IonGrid>
                {
                    (isLoading || isCategoryLoading) && <LoadingCard itemCount={6} column={6} />
                }
                {
                    (data && data[data.length-1].meta && data[data.length-1].meta.current_page!==data[data.length-1].meta.last_page) && <LoadMoreButton clickHandler={()=>setSize(size+1)} />
                }
            </IonContent>
        </IonPage>
    );
};

export default SubCategory;
