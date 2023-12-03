import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './CategorySection.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import LoadingCard from '../../components/LoadingCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useState } from 'react';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import { CategoryType, MetaType } from '../../helper/types';
import ShowMoreButton from '../ShowMoreButton';

const PAGE_SIZE = 20;

const CategorySection: React.FC<{inHomePage?:boolean}> = ({inHomePage=true}) => {
    const axiosPrivate = useAxiosPrivate();
    const [meta, setMeta] = useState<MetaType|undefined>(undefined)
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => {
        setMeta(res.data.meta)
        return res.data.data
    });
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
                        <CategoryCard image={item.image} text={item.name} link={item.sub_categories.length>0 ? `/category/${item.slug}` : `/category/${item.slug}/product`}  />
                    </IonCol>)
                    }
                </IonRow>
            </IonGrid>
            {
                isLoading && <LoadingCard itemCount={6} column={6} />
            }
            {
                inHomePage ? <ShowMoreButton link='/category' /> : 
                (meta && meta.current_page!==meta.last_page) && <LoadMoreButton clickHandler={()=>setSize(size+1)} />
            }
        </>
    );
};

export default CategorySection;
