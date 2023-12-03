import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonSearchbar, IonToolbar, SearchbarInputEventDetail } from '@ionic/react';
import './Search.css';
import SearchCard from '../../components/SearchCard';
import { useCallback, useState } from 'react';
import { api_routes } from '../../helper/routes';
import { GlobalSearchType } from '../../helper/types';
import LoadingCard from '../../components/LoadingCard';
import { Virtuoso } from 'react-virtuoso';
import useSWRInfinite from "swr/infinite";
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

const PAGE_SIZE = 20;

const Footer = () => {
    return <LoadingCard />
}

const Spacing = () => {
    return <div className='pb-1' />
}

const Search: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data.data);
  const [search, setSearch] = useState<string>("");

    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (search.length===0) return null;
        if (previousPageData && previousPageData.length===0) return null;
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
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonSearchbar showClearButton="focus" debounce={500} placeholder="Type to search..." className='search-input' onIonInput={(ev: CustomEvent<SearchbarInputEventDetail>) => searchFieldHandler(ev)} />
                </IonToolbar>
            </IonHeader>
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            scrollY={false}
            >
                <Virtuoso
                    data={searchData ? searchData.flat(): []}
                    overscan={searchData ? searchData.flat().length: PAGE_SIZE}
                    style={{ flex: 1 }}
                    atBottomStateChange={(atBottom)=> atBottom && setSize(size+1)}
                    itemContent={(index, item) => (<SearchCard link={item.search_type=='PRODUCT' ? `/products/${item.slug}` : (item.search_type=='CATEGORY' ? `/category/${item.slug}/product` : `/sub-category/${item.slug}/product`)} image={item.image} text={item.name} type={item.search_type} key={index} />)}
                    components={{Footer: isSearchLoading ? Footer : Spacing}}
                />
            </IonContent>
        </IonPage>
    );
};

export default Search;