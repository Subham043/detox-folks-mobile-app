import { IonButton, IonCol, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText, RefresherEventDetail, useIonRouter } from '@ionic/react';
import './Cart.css';
import MainHeader from '../../components/MainHeader';
import EmptyCart from '../../components/EmptyCart';
import { useCartContext } from '../../context/CartProvider';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { api_routes } from '../../helper/routes';
import { useAuth } from '../../context/AuthProvider';
import { useLocation } from 'react-router';
import LoadingCard from '../../components/LoadingCard';
import { chevronForwardOutline, locationOutline, newspaperOutline, peopleCircleOutline } from 'ionicons/icons';
import { BillingAddressResponseType, BillingInformationResponseType, LegalResponseType } from '../../helper/types';
import { Browser } from '@capacitor/browser';
import CartItem2 from '../../components/CartItem/CartItem2';
import BillingInformationModal from '../../components/BillingInformationModal';
import BillingAddressModal from '../../components/BillingAddressModal';
import CheckoutModal from '../../components/CheckoutModal';

const Cart2: React.FC = () => {
    const { cart, cartLoading } = useCartContext();
    const { auth } = useAuth();
    const location = useLocation();
    const router = useIonRouter();
    const { mutate } = useSWRConfig();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isBillingInfoOpen, setIsBillingInfoOpen] = useState<boolean>(false);
    const [isBillingAddressOpen, setIsBillingAddressOpen] = useState<boolean>(false);
    const [selectedBillingInformationData, setSelectedBillingInformationData] = useState<number>(0)
    const [selectedBillingAddressData, setSelectedBillingAddressData] = useState<number>(0)
    const { data:billingInformationData, isLoading:billingInformationLoading } = useSWR<BillingInformationResponseType>(auth.authenticated ? api_routes.billing_information_all : null);
    const { data:billingAddressData, isLoading:billingAddressLoading } = useSWR<BillingAddressResponseType>(auth.authenticated ? api_routes.billing_address_all : null);
    const { data:legalData } = useSWR<LegalResponseType>(api_routes.legal);
    useEffect(()=>{
        let isMounted = true;
        if(isMounted && auth.authenticated && location.pathname==='/cart'){
            mutate(api_routes.cart_all);
            mutate(api_routes.billing_information_all);
            mutate(api_routes.billing_address_all);
        }
        return () => {
            isMounted=false
        }
    }, [auth.authenticated, location.pathname])

    useEffect(() => {
        if(auth.authenticated && billingInformationData!==undefined && billingInformationData.data.length>0 ){
            setSelectedBillingInformationData(billingInformationData && billingInformationData.data.length>0 ? billingInformationData.data[0].id : 0)
        }
        return () => {setSelectedBillingInformationData(0)}
    }, [auth.authenticated, billingInformationData])
    
    useEffect(() => {
        if(auth.authenticated && billingAddressData!==undefined && billingAddressData.data.length>0 ){
            setSelectedBillingAddressData(billingAddressData && billingAddressData.data.length>0 ? billingAddressData.data[0].id : 0)
        }
        return () => {setSelectedBillingAddressData(0)}
    }, [auth.authenticated, billingAddressData])

    const loadPage = async(url:string) =>{
        await Browser.open({ url });
    }

    return (
        <IonPage>
            <MainHeader isMainHeader={true} />
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            style={{'--background': '#f2f2f2'}}
            >
                {
                    cartLoading ? <LoadingCard itemCount={4} column={12} height='100px' /> :
                    <>
                        <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                            setTimeout(() => {
                                // Any calls to load data go here
                                mutate(api_routes.cart_all);
                                event.detail.complete();
                            }, 1500);
                        }}>
                            <IonRefresherContent></IonRefresherContent>
                        </IonRefresher>
                        {
                            cart.cart.length===0 ? 
                            <EmptyCart /> :
                            <>
                                <div className="page-padding mt-1">
                                    <div className="delivery-address-card">
                                        <h6><IonIcon icon={locationOutline} className='svg-icon' /> <span>Delivery Address</span></h6>
                                        {(!billingAddressLoading && billingAddressData && billingAddressData.data.length>0) ? <div className="delivery-card-row">
                                            <IonLabel className="delivery-detail">
                                                {billingAddressData.data.filter(item => item.id===selectedBillingAddressData).length>0 && <p>{billingAddressData.data.filter(item => item.id===selectedBillingAddressData)[0].address}, {billingAddressData.data.filter(item => item.id===selectedBillingAddressData)[0].city}, {billingAddressData.data.filter(item => item.id===selectedBillingAddressData)[0].state} - {billingAddressData.data.filter(item => item.id===selectedBillingAddressData)[0].pin}, {billingAddressData.data.filter(item => item.id===selectedBillingAddressData)[0].country}</p>}
                                            </IonLabel>
                                            <div className="delivery-select">
                                                <button onClick={()=>setIsBillingAddressOpen(true)}>Edit</button>
                                            </div>
                                        </div>:
                                        <div className="delivery-card-row">
                                            <IonLabel className="delivery-detail">
                                                <p><i>Add billing address to place an order</i></p>
                                            </IonLabel>
                                            <div className="delivery-select">
                                                <button onClick={()=>router.push('/billing-address')}>ADD</button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className="delivery-address-card-no-padding mt-1">
                                        {
                                            cart.cart.map((item, i) => <CartItem2 {...item} key={i} />)
                                        }
                                    </div>
                                </div>
                                <div className='cart-message'>
                                    <p>You have realized a minimum savings of 20% - 25% on your standard purchase when compared to retail price.</p>
                                </div>
                                <div className="page-padding">

                                    <div className="delivery-address-card mt-1">
                                        <h6><IonIcon icon={peopleCircleOutline} className='svg-icon' /> <span>Billing Information</span></h6>
                                        {(!billingInformationLoading && billingInformationData && billingInformationData.data.length>0) ? <div className="delivery-card-row">
                                            <IonLabel className="delivery-detail">
                                                {billingInformationData.data.filter(item => item.id===selectedBillingInformationData).length>0 && <p>{billingInformationData.data.filter(item => item.id===selectedBillingInformationData)[0].name}, {billingInformationData.data.filter(item => item.id===selectedBillingInformationData)[0].email}, {billingInformationData.data.filter(item => item.id===selectedBillingInformationData)[0].phone}</p>}
                                            </IonLabel>
                                            <div className="delivery-select">
                                                <button onClick={()=>setIsBillingInfoOpen(true)}>EDIT</button>
                                            </div>
                                        </div> : <div className="delivery-card-row">
                                            <IonLabel className="delivery-detail">
                                                <p><i>Add billing information to place an order</i></p>
                                            </IonLabel>
                                            <div className="delivery-select">
                                                <button onClick={()=>router.push('/billing-information')}>ADD</button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className="delivery-address-card-no-padding mt-1">
                                        <div className='cart-total-price-heading'>
                                            <h6>Prices are inclusive of GST.</h6>
                                        </div>
                                        <div>
                                            <div className="cart-divider">
                                                <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                                    <IonCol
                                                        size="6"
                                                        className='text-left'
                                                    >
                                                        <IonText>
                                                        <p className='cart-text'>Sub Total</p>
                                                        </IonText>
                                                    </IonCol>
                                                    <IonCol
                                                        size="6"
                                                        className='text-right'
                                                    >
                                                        <IonText>
                                                        <p className='cart-text'><b>&#8377;{cart.cart_subtotal}</b></p>
                                                        </IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </div>
                                            <div className="cart-divider">
                                                <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                                    <IonCol
                                                        size="6"
                                                        className='text-left'
                                                    >
                                                        <IonText>
                                                        <p className='cart-text'>Delivery Charges</p>
                                                        </IonText>
                                                    </IonCol>
                                                    <IonCol
                                                        size="6"
                                                        className='text-right'
                                                    >
                                                        <IonText>
                                                        <p className='cart-text'><b>Free</b></p>
                                                        </IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </div>
                                            <div className="cart-divider">
                                                <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                                    <IonCol
                                                        size="6"
                                                        className='text-left'
                                                    >
                                                        <IonText>
                                                        <p className='cart-text'><code>Total</code></p>
                                                        </IonText>
                                                    </IonCol>
                                                    <IonCol
                                                        size="6"
                                                        className='text-right'
                                                    >
                                                        <IonText>
                                                        <p className='cart-text'><b>&#8377;{cart.total_price}</b></p>
                                                        </IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="delivery-address-card-no-padding mt-1">
                                    {
                                        legalData && legalData.legal.map((item, i) => <IonItem className="cart-policy-item" lines="full" detail={true} onClick={()=>loadPage(`https://parcelcounter.in/legal/${item.slug}`)} key={i}>
                                            <IonLabel>{item.page_name}</IonLabel>
                                            <IonIcon icon={newspaperOutline} slot="start"></IonIcon>
                                        </IonItem>)
                                    }
                                    </div>
                                </div>
                            </>
                        }
                        
                        {
                            cart.cart.length>0 &&
                            <>
                                <BillingInformationModal isOpen={isBillingInfoOpen} setIsOpen={setIsBillingInfoOpen} billingInformationData={billingInformationData} billingInformationLoading={billingInformationLoading} selectedBillingInformationData={selectedBillingInformationData} setSelectedBillingInformationData={setSelectedBillingInformationData} />
                                
                                <BillingAddressModal isOpen={isBillingAddressOpen} setIsOpen={setIsBillingAddressOpen} billingAddressData={billingAddressData} billingAddressLoading={billingAddressLoading} selectedBillingAddressData={selectedBillingAddressData} setSelectedBillingAddressData={setSelectedBillingAddressData} />

                                <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} selectedBillingAddressData={selectedBillingAddressData} selectedBillingInformationData={selectedBillingInformationData} />
                                
                                {((billingAddressData && billingAddressData.data.length>0) && (billingInformationData && billingInformationData.data.length>0)) && <>
                                    <IonItemDivider className="view-cart-checkout-btn-main-container" slot="fixed">
                                        <div className="w-100 no-underline">
                                            <IonRow className="ion-align-items-center ion-justify-content-center p-0 w-100">
                                                <IonCol
                                                    size="12"
                                                    className='text-right'
                                                >
                                                    <IonButton className="pagination-btn m-0" fill='solid' color="dark" onClick={()=>setIsOpen(true)}>
                                                        <IonRow className="ion-align-items-center ion-justify-content-center p-0 w-100">
                                                            <IonCol
                                                                size="6"
                                                                className='text-left'
                                                            >
                                                                <div>
                                                                    {cart.cart.length} {cart.cart.length===1 ? 'Item' : 'Items'} | &#8377;{cart.total_price}
                                                                </div>
                                                            </IonCol>
                                                            <IonCol
                                                                size="6"
                                                                className='text-right'
                                                            >
                                                                <div className="view-cart-text-icon-holder">
                                                                    <span>Checkout</span>
                                                                    <IonIcon icon={chevronForwardOutline} className="svg-icon" />
                                                                </div>
                                                            </IonCol>
                                                        </IonRow>
                                                            
                                                    </IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </div>
                                    </IonItemDivider>
                                    <div className="cart-fixed-spacing-2"></div>
                                </>}
                            </>
                        }
                    </>
                }
                
            </IonContent>
        </IonPage>
    );
};

export default Cart2;
