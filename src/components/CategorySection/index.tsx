import { IonCol, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react';
import './CategorySection.css';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import LoadingCard from '../../components/LoadingCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback } from 'react';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import { CategoryType } from '../../helper/types';
import ShowMoreButton from '../ShowMoreButton';

const PAGE_SIZE = 20;

const CategorySection: React.FC<{inHomePage?:boolean}> = ({inHomePage=true}) => {
    const axiosPrivate = useAxiosPrivate();
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.categories}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id`;
    }, [])
    
    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<CategoryType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });
    
    return (
        <>
            <CommonHeading text='Our Category' />
            <IonGrid>
                <IonRow className="ion-align-items-center ion-justify-content-center">
                    {
                        (data ? data.flat(): []).map((item, i) =>  <IonCol
                            size="6"
                            size-xl="3"
                            size-lg="3"
                            size-md="4"
                            size-sm="6"
                            size-xs="6"
                            key={i}
                        >
                            <CategoryCard image={item.image} text={item.name} link={item.sub_categories.length>0 ? `/sub-category?category_slug=${item.slug}` : `/product?category_slug=${item.slug}`}  />
                        </IonCol>)
                    }
                </IonRow>
            </IonGrid>
            {
                isLoading && <LoadingCard itemCount={6} column={6} />
            }
            {
                inHomePage ? <ShowMoreButton link='/category' /> : 
                <IonInfiniteScroll
                    onIonInfinite={(ev) => {
                    setSize(size+1);
                    ev.target.complete()
                  }}
                >
                    <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            }
        </>
    );
};

export default CategorySection;
