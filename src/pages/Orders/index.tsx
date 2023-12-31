import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import './Orders.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import { api_routes } from '../../helper/routes';
import { useCallback, useContext } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../context/AuthProvider';
import useSWRInfinite from "swr/infinite";
import { OrderType } from '../../helper/types';
import LoadingCard from '../../components/LoadingCard';
import OrderCard from '../../components/OrderCard';

const PAGE_SIZE = 20;

const Orders: React.FC = () =>{
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useContext(AuthContext);
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if(!auth.authenticated) return null;
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.place_order_paginate}?total=${PAGE_SIZE}&page=${pageIndex+1}`;
    }, [])
    const {
        data,
        mutate,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<OrderType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });
    return <IonPage>
        <MainHeader isMainHeader={false} name='orders' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                setTimeout(() => {
                    // Any calls to load data go here
                    auth.authenticated && mutate();
                    event.detail.complete();
                }, 1500);
            }}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <CommonHeading text='Orders' />
            <div className="order-card-wrapper">
                {
                    (data ? data.flat(): []).map((item, i) => <OrderCard {...item} key={i} />)
                }
            </div>
            {
                isLoading && <LoadingCard itemCount={6} column={12} />
            }
            <div className="cart-fixed-spacing-2"></div>
            <IonInfiniteScroll
                onIonInfinite={(ev) => {
                setSize(size+1);
                ev.target.complete()
                }}
            >
                <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonContent>
    </IonPage>
}

export default Orders;