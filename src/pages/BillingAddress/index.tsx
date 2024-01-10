import { IonButton, IonCol, IonContent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonText, RefresherEventDetail } from '@ionic/react';
import CommonHeading from '../../components/CommonHeading';
import './BillingAddress.css';
import MainHeader from '../../components/MainHeader';
import { createOutline, locationOutline, trashOutline } from 'ionicons/icons';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { api_routes } from '../../helper/routes';
import { BillingAddressType } from '../../helper/types';
import useSWRInfinite from "swr/infinite";
import { AuthContext } from '../../context/AuthProvider';
import LoadingCard from '../../components/LoadingCard';
import { useToast } from '../../hooks/useToast';
import BillingAddressEdit from '../../components/BillingAddressEdit';
import { useLocation } from 'react-router';

const PAGE_SIZE = 20;

const BillingAddress: React.FC = () => {

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    const { toastSuccess, toastError} = useToast();
    const [modalData, setModalData] = useState<any>({
        isEdit:false
    });
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
        if(!auth.authenticated) return null;
        if ((previousPageData && previousPageData.length===0) || (previousPageData && previousPageData.length<PAGE_SIZE)) {
            setHasNextPage(false);
            return null;
        }
        return `${api_routes.billing_address_list}?total=${PAGE_SIZE}&page=${pageIndex+1}`;
    }, [auth.authenticated])
    
    const {
        data,
        size,
        setSize,
        mutate,
        isLoading
    } = useSWRInfinite<BillingAddressType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: true,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    const deleteHandler = async (id: number) => {
        setDeleteLoading(true)
        try {
            const response = await axiosPrivate.delete(api_routes.billing_address_delete+`/${id}`);
            mutate();
            toastSuccess(response.data.message);
        } catch (error) {
            console.log(error);
            toastError('Oops. something went wrong! please try again later.');
        }finally {
            setDeleteLoading(false)
        }
    }

    useEffect(()=>{
        let isMounted = true;
        if(isMounted && auth.authenticated && location.pathname==='/billing-address'){
            mutate();
        }
        return () => {
            isMounted=false
        }
    }, [auth.authenticated, location.pathname])
    
    return (
        <IonPage>
            <MainHeader isMainHeader={false} name='Billing Address' />
            <IonContent fullscreen={false} forceOverscroll={false}>
                <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                    setTimeout(() => {
                        // Any calls to load data go here
                        auth.authenticated && mutate();
                        event.detail.complete();
                    }, 1500);
                }}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div className="mt-1">
                    <IonList>
                        {
                            (data ? data.flat(): []).map((item, i) => 
                                <IonItemSliding key={item.id}>
                                    <IonItem>
                                        <IonIcon aria-hidden="true" icon={locationOutline} slot="start" className='billing-address-location-icon'></IonIcon>
                                        <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                            <IonCol
                                                size="12"
                                                className='text-left'
                                            >
                                                <IonLabel className='billing-address-text'>
                                                    <h6>{item.country}</h6>
                                                    <p>
                                                        {item.address}, {item.city}, {item.state} - {item.pin}, {item.country}
                                                    </p>
                                                </IonLabel>
                                            </IonCol>
                                        </IonRow>
                                    </IonItem>
                                    <IonItemOptions>
                                        <IonItemOption color='dark' onClick={()=>{
                                            setModalData({
                                                isEdit:true,
                                                data: {...item}
                                            })
                                            setIsOpen(true);
                                        }}>
                                            <IonIcon slot="icon-only" icon={createOutline} />
                                        </IonItemOption>
                                        <IonItemOption color="danger" disabled={deleteLoading} onClick={()=>deleteHandler(item.id)}>
                                            {deleteLoading ? <IonSpinner color='light' />: <IonIcon slot="icon-only" icon={trashOutline} />}
                                        </IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            )
                        }
                    </IonList>
                    {
                        isLoading && <LoadingCard itemCount={6} column={12} height='70px' />
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
                    <div className="cart-fixed-spacing-2"></div>
                </div>
                <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} id={`billing-address-edit`} className="post-price-modal w-100" initialBreakpoint={1} breakpoints={[0, 1]}>
                    <BillingAddressEdit showModal={setIsOpen} mutate={mutate} {...modalData} />
                </IonModal>
                <IonItemDivider className="ion-padding address-divider w-100" slot="fixed">
                    <IonRow className="w-100 ion-align-items-center ion-justify-content-between">
                        <IonCol
                            size="12"
                            sizeLg='12'
                            sizeMd='12'
                            sizeSm='12'
                            sizeXl='12'
                            sizeXs='12'
                            className='text-center'
                        >
                            <IonButton className="add-address-btn w-100" fill='solid' color="dark" onClick={()=>{
                                setModalData({
                                    isEdit:false
                                })
                                setIsOpen(true);
                            }}>
                                Add New Address
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonItemDivider>
            </IonContent>
        </IonPage>
        
    );
}

export default BillingAddress;