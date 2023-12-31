import { IonCol, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react';
import './SpecialProductSection.css';
import CommonHeading from '../../components/CommonHeading';
import ProductCard from '../../components/ProductCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback } from 'react';
import { ProductType } from '../../helper/types';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import LoadingCard from '../../components/LoadingCard';
import ShowMoreButton from '../ShowMoreButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MainProductCard from '../MainProductCard';
import RowHeading from '../RowHeading';

const PAGE_SIZE = 20;

type Props = {
    inHomePage?: boolean;
    slug?: "is_featured" | "is_new" | "is_on_sale";
    name?: string;
}

const SpecialProductSliderSection: React.FC<Props> = ({inHomePage=true, slug, name}) => {
    const axiosPrivate = useAxiosPrivate();
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.products}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id${slug ? `&filter[${slug}]=true` : ''}`;
    }, [slug])
    
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
        <>
            <RowHeading text={name ? name : ''} link={`/special-product/${slug}`} inHomePage={true} />
            <div className='page-padding slider-padding section-container'>
                <div className="main-product-slider">
                    {
                        (isLoading) && <LoadingCard itemCount={1} column={12} />
                    }
                    <Swiper
                        modules={[Pagination]}
                        autoplay={false}
                        keyboard={false}
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        pagination={false}
                        spaceBetween={10}
                        scrollbar={false}
                        zoom={false}
                        onSlideNextTransitionEnd={(swiper)=>((data ? data.flat() : []).length>0 && (swiper.activeIndex+1)>=((data ? data.flat() : []).length/2)) && setSize(size+1)}
                    >
                        {
                            (data ? data.flat() : []).map((item, i) => <SwiperSlide key={i}>
                                <MainProductCard {...item} />
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
                {/* <IonGrid>
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
                                <ProductCard {...item} />
                            </IonCol>)
                        }
                    </IonRow>
                </IonGrid> */}
                {/* {
                    (isLoading) && <LoadingCard itemCount={6} column={6} />
                }
                {
                    inHomePage ? <ShowMoreButton link={`/special-product/${slug}`} /> : 
                    <IonInfiniteScroll
                        onIonInfinite={(ev) => {
                        setSize(size+1);
                        ev.target.complete()
                    }}
                    >
                        <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                } */}
            </div>
        </>
    );
};

export default SpecialProductSliderSection;
