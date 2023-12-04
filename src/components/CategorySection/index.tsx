import { IonCol, IonGrid, IonRow } from '@ionic/react';
import './CategorySection.css';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import LoadingCard from '../../components/LoadingCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback } from 'react';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import { CategoryResponseType } from '../../helper/types';
import ShowMoreButton from '../ShowMoreButton';

const PAGE_SIZE = 20;

const CategorySection: React.FC<{inHomePage?:boolean}> = ({inHomePage=true}) => {
    const axiosPrivate = useAxiosPrivate();
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.categories}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id`;
    }, [])
    
    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<CategoryResponseType>(getKey, fetcher,{
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
                        (data ? data: []).map((item, i) => item.data.map((itm, index) => <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                        key={index}
                    >
                        <CategoryCard image={itm.image} text={itm.name} link={itm.sub_categories.length>0 ? `/sub-category?category_slug=${itm.slug}` : `/product?category_slug=${itm.slug}`}  />
                    </IonCol>))
                    }
                </IonRow>
            </IonGrid>
            {
                isLoading && <LoadingCard itemCount={6} column={6} />
            }
            {
                inHomePage ? <ShowMoreButton link='/category' /> : 
                (data && data[data.length-1].meta && data[data.length-1].meta.current_page!==data[data.length-1].meta.last_page) && <LoadMoreButton clickHandler={()=>setSize(size+1)} />
            }
        </>
    );
};

export default CategorySection;
