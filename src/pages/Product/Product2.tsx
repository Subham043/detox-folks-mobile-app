import { IonCardHeader, IonCol, IonContent, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import './Product.css';
import MainHeader from '../../components/MainHeader';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useRef, useState } from 'react';
import { CategoryType, ProductType, SubCategoryType } from '../../helper/types';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import LoadingCard from '../../components/LoadingCard';
import { useLocation } from 'react-router';
import useSWR from 'swr'
import MainProductCard from '../../components/MainProductCard';
import ViewCartBtn from '../../components/ViewCartBtn';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const PAGE_SIZE = 20;
const CATEGORY_PAGE_SIZE = 6;

const Product2: React.FC = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const sub_category_slug = query.get('sub_category_slug')
    const axiosPrivate = useAxiosPrivate();

    const { data:subCategoryData, isLoading:isSubCategoryLoading } = useSWR<{subCategory: SubCategoryType}>(sub_category_slug ? api_routes.sub_categories + `/${sub_category_slug}` : null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const productRef = useRef<HTMLIonInfiniteScrollElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
    const [hasSubCategories, setHasSubCategories] = useState<boolean>(false);
    
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
        return `${api_routes.products}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id${selectedCategory!=='All' ? '&filter[has_categories]='+selectedCategory : ''}${selectedSubCategory!=='All' ? '&filter[has_sub_categories]='+selectedSubCategory : ''}`;
    }, [selectedCategory, subCategoryData])
    
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
            <MainHeader isMainHeader={true} />
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            >
                <CategorySelectionSlider selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setHasSubCategories={setHasSubCategories} setSelectedSubCategory={setSelectedSubCategory} />
                {
                    hasSubCategories ? <SubCategorySelection selectedCategory={selectedCategory} setHasSubCategories={setHasSubCategories} setSelectedSubCategory={setSelectedSubCategory} hasSubCategories={hasSubCategories} /> :<>
                        {
                            (data ? data.flat(): []).map((item, i) => <MainProductCard {...item} key={i} />)
                        }
                        {
                            (isLoading || isSubCategoryLoading) && <LoadingCard itemCount={3} column={12} />
                        }
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
                    </>
                }
                <ViewCartBtn />
            </IonContent>
        </IonPage>
    );
};

export default Product2;

const CategorySelectionSlider:React.FC<{
    selectedCategory:string;
    setSelectedCategory:React.Dispatch<React.SetStateAction<string>>;
    setHasSubCategories: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedSubCategory:React.Dispatch<React.SetStateAction<string>>;
}> =({selectedCategory, setSelectedCategory, setHasSubCategories, setSelectedSubCategory}) => {
    const axiosPrivate = useAxiosPrivate();

    const categoryFetcher = async (url: string) => {
        const res =await axiosPrivate.get(url);
        return res.data.data
    };
    const getCategoryKey = useCallback((pageIndex:any, previousPageData:any) => {
        if ((previousPageData && previousPageData.length===0) || (previousPageData && previousPageData.length<CATEGORY_PAGE_SIZE)) return null;
        return `${api_routes.categories}?total=${CATEGORY_PAGE_SIZE}&page=${pageIndex+1}&sort=id`;
    }, [])
    
    const {
        data:categoryData,
        size:categorySize,
        setSize: setCategorySize,
        isLoading: isCategoryLoading
    } = useSWRInfinite<CategoryType>(getCategoryKey, categoryFetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    const categorySelectionHandler = (category: CategoryType|'All') => {
        setSelectedSubCategory('All')
        if(category==='All'){
            setSelectedCategory('All');
            setHasSubCategories(false);
        }else{
            setSelectedCategory(category.id.toString());
            if(category.sub_categories.length>0){
                setHasSubCategories(true);
            }else{
                setHasSubCategories(false);
            }
        }
    }

    return <div className='page-padding slider-padding billing-info-section category-selection-section'>
        <div className="payment-option-slider">
            {
                (isCategoryLoading) ? <LoadingCard itemCount={3} column={4} height='30px' /> : 
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
                    onSlideNextTransitionEnd={(swiper)=>((categoryData ? categoryData.flat() : []).length>0 && (swiper.activeIndex+1)>=((categoryData ? categoryData.flat() : []).length/2)) && setCategorySize(categorySize+1)}
                >
                    <SwiperSlide>
                        <div className={selectedCategory==='All' ? 'billing-info-section-card-active' : 'billing-info-section-card'} onClick={()=>categorySelectionHandler('All')}>
                            <IonLabel className='billing-info-section-card-text'>
                                <h6>All</h6>
                            </IonLabel>
                        </div>
                    </SwiperSlide>
                    {
                        (categoryData ? categoryData.flat(): []).map((item, i) => <SwiperSlide key={i}>
                            <div className={selectedCategory===item.id.toString() ? 'billing-info-section-card-active' : 'billing-info-section-card'} onClick={()=>categorySelectionHandler(item)}>
                                <IonLabel className='billing-info-section-card-text'>
                                    <h6>{item.name}</h6>
                                </IonLabel>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            }
        </div>
    </div>
};

const SubCategorySelection:React.FC<{
    selectedCategory:string;
    hasSubCategories:boolean;
    setSelectedSubCategory:React.Dispatch<React.SetStateAction<string>>;
    setHasSubCategories: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setHasSubCategories, setSelectedSubCategory, selectedCategory, hasSubCategories}) =>{
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
        if(!hasSubCategories) return null;
        if ((previousPageData && previousPageData.length===0) || (previousPageData && previousPageData.length<PAGE_SIZE)) {
            setHasNextPage(false);
            return null;
        }
        return `${api_routes.sub_categories}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id${selectedCategory!=='All' ? '&filter[has_categories]='+selectedCategory : ''}`;
    }, [selectedCategory])

    
    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<SubCategoryType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    const subCategorySelectionHandler = (subCategory: SubCategoryType) => {
        setSelectedSubCategory(subCategory.id.toString());
        setHasSubCategories(false);
    }

    return <div className='page-padding mt-1'>
    <IonRow className="ion-align-items-start ion-justify-content-center">
        {
            (data ? data.flat(): []).map((item, i) => <IonCol
                size="6"
                size-xl="3"
                size-lg="3"
                size-md="4"
                size-sm="4"
                size-xs="4"
                key={i}
            >
                <SubCategoryCard {...item} subCategorySelectionHandler={subCategorySelectionHandler} />
            </IonCol>)
        }
    </IonRow>
    {
        (isLoading) && <LoadingCard itemCount={6} column={4} />
    }
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
</div>
}

const SubCategoryCard: React.FC<SubCategoryType & {subCategorySelectionHandler: (subCategory: SubCategoryType)=>void}> = (props) => 
{
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    return <button className="main-subcategory-card-btn no-underline" onClick={()=>props.subCategorySelectionHandler({...props})}>
        <div className="category-card-2">
            {
                imgLoading &&
                <div className="text-center mt-1">
                    <IonSpinner color='dark' />
                </div>
            }
            <IonImg alt="category" src={props.image} class="category-card-image" onIonImgDidLoad={()=>setImgLoading(false)} />
            <IonCardHeader className="category-card-header">
                <IonText color="dark">
                    <p className="category-card-text">{props.name}</p>
                </IonText>
            </IonCardHeader>
        </div>
    </button>
}