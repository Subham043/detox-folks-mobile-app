import { IonCol, IonGrid, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react';
import './CategorySection.css';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import LoadingCard from '../../components/LoadingCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useRef, useState } from 'react';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import { CategoryType } from '../../helper/types';
import ShowMoreButton from '../ShowMoreButton';
import CategoryCard2 from '../CategoryCard/CategoryCard2';
import { chevronForwardOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import RowHeading from '../RowHeading';

const PAGE_SIZE = 20;

const CategorySection: React.FC<{inHomePage?:boolean}> = ({inHomePage=true}) => {
    const axiosPrivate = useAxiosPrivate();
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const productRef = useRef<HTMLIonInfiniteScrollElement | null>(null);

    const fetcher = async (url: string) => {
        const res =await axiosPrivate.get(url);
        setTimeout(async() => {
          if(productRef && productRef.current){
            await productRef.current.complete()
          }
        }, 500)
        return res.data.data
    };
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if ((previousPageData && previousPageData.length===0) || (previousPageData && previousPageData.length<PAGE_SIZE)) {
            setHasNextPage(false);
            return null;
        }
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
            <RowHeading text='What are you looking for?' link='/category' inHomePage={inHomePage} />
            <div className='page-padding section-container'>
                {/* <CommonHeading text='What are you looking for?' /> */}
                <IonRow className="ion-align-items-start ion-justify-content-center mb-2">
                    {
                        (data ? data.flat(): []).map((item, i) =>  <IonCol
                            size="6"
                            size-xl="3"
                            size-lg="3"
                            size-md="4"
                            size-sm="4"
                            size-xs="4"
                            key={i}
                        >
                            <CategoryCard2 image={item.image} text={item.name} link={item.sub_categories.length>0 ? `/sub-category?category_slug=${item.slug}` : `/product?category_slug=${item.slug}`}  />
                        </IonCol>)
                    }
                </IonRow>
                {
                    isLoading && <LoadingCard itemCount={6} column={4} />
                }
                {
                    !inHomePage && 
                    <IonInfiniteScroll
                        ref={productRef}
                        onIonInfinite={(ev) => {
                            if (ev.target.scrollTop + ev.target.offsetHeight>= ev.target.scrollHeight ){
                                !isLoading && setSize(size+1);
                            }
                        }}
                    >
                        {hasNextPage && <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>}
                    </IonInfiniteScroll>
                }
            </div>
        </>
    );
};

export default CategorySection;
