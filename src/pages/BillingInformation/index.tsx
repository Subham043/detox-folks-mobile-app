import { IonButton, IonCol, IonContent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemDivider, IonLabel, IonList, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonText, RefresherEventDetail } from '@ionic/react';
import CommonHeading from '../../components/CommonHeading';
import './BillingInformation.css';
import MainHeader from '../../components/MainHeader';
import { createOutline, peopleCircleOutline, trashOutline } from 'ionicons/icons';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useContext, useEffect, useState } from 'react';
import { api_routes } from '../../helper/routes';
import { BillingInformationType } from '../../helper/types';
import useSWRInfinite from "swr/infinite";
import { AuthContext } from '../../context/AuthProvider';
import LoadingCard from '../../components/LoadingCard';
import { useToast } from '../../hooks/useToast';
import { useLocation } from 'react-router';
import BillingInformationEdit from '../../components/BillingInformationEdit';

const PAGE_SIZE = 20;

const BillingInformation: React.FC = () => {

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    const { toastSuccess, toastError} = useToast();
    const [modalData, setModalData] = useState<any>({
        isEdit:false
    });
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data.data);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if(!auth.authenticated) return null;
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.billing_information_list}?total=${PAGE_SIZE}&page=${pageIndex+1}`;
    }, [auth.authenticated])
    
    const {
        data,
        size,
        setSize,
        mutate,
        isLoading
    } = useSWRInfinite<BillingInformationType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: true,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    const deleteHandler = async (id: number) => {
        setDeleteLoading(true)
        try {
            const response = await axiosPrivate.delete(api_routes.billing_information_delete+`/${id}`);
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
            <MainHeader isMainHeader={false} name='Billing Information' />
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
                <CommonHeading text='Billing Information' />
                <IonList>
                    {
                        (data ? data.flat(): []).map((item, i) => 
                            <IonItem key={i}>
                                <IonIcon aria-hidden="true" icon={peopleCircleOutline} slot="start" className='billing-address-location-icon'></IonIcon>
                                <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                    <IonCol
                                        size="8"
                                        className='text-left'
                                    >
                                        <IonLabel className='billing-address-text'>
                                            <h6>{item.name}</h6>
                                            <p>
                                                {item.email}, {item.phone}, {item.gst}
                                            </p>
                                        </IonLabel>
                                    </IonCol>
                                    <IonCol
                                        size="4"
                                        className='text-right'
                                    >
                                            <IonButton color='dark' size='default' className='billing-address-btn' onClick={()=>{
                                                setModalData({
                                                    isEdit:true,
                                                    data: {...item}
                                                })
                                                setIsOpen(true);
                                            }}>
                                                <IonIcon icon={createOutline} />
                                            </IonButton>
                                            <IonButton color='danger' size='default' className='billing-address-btn' disabled={deleteLoading} onClick={()=>deleteHandler(item.id)}>
                                               {deleteLoading ? <IonSpinner color='light' />: <IonIcon icon={trashOutline} />}
                                            </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonItem>
                        )
                    }
                </IonList>
                {
                    isLoading && <LoadingCard itemCount={6} column={12} height='70px' />
                }
                <IonInfiniteScroll
                    onIonInfinite={(ev) => {
                    setSize(size+1);
                    ev.target.complete()
                  }}
                >
                    <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
                <div className="cart-fixed-spacing-2"></div>
                <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} id={`billing-address-edit`} className="post-price-modal w-100" initialBreakpoint={1} breakpoints={[0, 1]}>
                    <BillingInformationEdit showModal={setIsOpen} mutate={mutate} {...modalData} />
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

export default BillingInformation;