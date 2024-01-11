import { IonBackButton, IonButtons, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonSearchbar, IonToolbar, SearchbarInputEventDetail } from '@ionic/react';
import './Search.css';
import SearchCard from '../../components/SearchCard';
import { useCallback, useRef, useState } from 'react';
import { api_routes } from '../../helper/routes';
import { GlobalSearchType } from '../../helper/types';
import LoadingCard from '../../components/LoadingCard';
import { Virtuoso } from 'react-virtuoso';
import useSWRInfinite from "swr/infinite";
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import NoData from '../../components/NoData';
import ViewCartBtn from '../../components/ViewCartBtn';

const PAGE_SIZE = 20;

const Footer = () => {
    return <LoadingCard />
}

const Spacing = () => {
    return <div className='pb-1' />
}

const Search: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
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
    const [search, setSearch] = useState<string>("");

    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (search.length===0) return null;
        if ((previousPageData && previousPageData.length===0) || (previousPageData && previousPageData.length<PAGE_SIZE)) {
            if(productRef && productRef.current){
                productRef.current.complete()
            }
            return null;
        }
        return `${api_routes.global_search}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id&filter[search]=${search}`;
    }, [search])

    const {
        data:searchData,
        size,
        setSize,
        isLoading: isSearchLoading
    } = useSWRInfinite<GlobalSearchType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    const searchFieldHandler = (ev:CustomEvent<SearchbarInputEventDetail>) => setSearch(ev.detail.value ? ev.detail.value : '');
    
    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color='dark'></IonBackButton>
                    </IonButtons>
                    <IonSearchbar showClearButton="focus" debounce={500} placeholder="Type to search..." className='search-input' onIonInput={(ev: CustomEvent<SearchbarInputEventDetail>) => searchFieldHandler(ev)} />
                </IonToolbar>
            </IonHeader>
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            style={{'--background': '#f2f2f2'}}
            >
                <div className="page-padding">
                    {
                        (searchData ? searchData.flat(): []).map((item, index) => <SearchCard link={item.search_type=='PRODUCT' ? `/product-detail/${item.slug}` : (item.search_type=='CATEGORY' ? `/product?category_slug=${item.slug}` : `/product?sub_category_slug=${item.slug}`)} image={item.image} text={item.name} type={item.search_type} key={index} />)
                    }
                </div>
                {
                    isSearchLoading && <LoadingCard itemCount={6} column={12} />
                }
                {
                    (!isSearchLoading && (searchData ? searchData.flat(): []).length===0 && search.length!==0) && <NoData message='No data is available!' />
                }
                <IonInfiniteScroll
                    ref={productRef}
                    onIonInfinite={(ev) => {
                        if (ev.target.scrollTop + ev.target.offsetHeight>= ev.target.scrollHeight ){
                            !isSearchLoading && setSize(size+1);
                        }
                    }}
                >
                    <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
                <ViewCartBtn />
            </IonContent>
        </IonPage>
    );
};

export default Search;