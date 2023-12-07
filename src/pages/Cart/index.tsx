import { IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonText, RefresherEventDetail } from '@ionic/react';
import './Cart.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import EmptyCart from '../../components/EmptyCart';
import { CartContext } from '../../context/CartProvider';
import { useContext, useEffect } from 'react';
import CartItem from '../../components/CartItem';
import useSWR, { useSWRConfig } from 'swr';
import { api_routes } from '../../helper/routes';
import { AuthContext } from '../../context/AuthProvider';
import { useLocation } from 'react-router';
import LoadingCard from '../../components/LoadingCard';
import { cardOutline, cashOutline, locationOutline, peopleCircleOutline } from 'ionicons/icons';
import { BillingAddressResponseType, BillingInformationResponseType } from '../../helper/types';

const Cart: React.FC = () => {
    const { cart, cartLoading } = useContext(CartContext);
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const { mutate } = useSWRConfig();
    const { data:billingInformationData, isLoading:billingInformationLoading } = useSWR<BillingInformationResponseType>(auth.authenticated ? api_routes.billing_information_all : null);
    const { data:billingAddressData, isLoading:billingAddressLoading } = useSWR<BillingAddressResponseType>(auth.authenticated ? api_routes.billing_address_all : null);
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

    return (
        <IonPage>
            <MainHeader isMainHeader={true} />
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            >
                <CommonHeading text='Cart' />
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
                                <IonCard className="cart-card">
                                    {
                                        cart.cart.map((item, i) => <CartItem {...item} key={i} />)
                                    }
                                </IonCard>
                                <div className='cart-message'>
                                    <p>You have realized a minimum savings of 20% - 25% on your standard purchase when compared to retail price.</p>
                                </div>
                                <IonCard>
                                    <div className='cart-total-price-heading'>
                                        <h6>Note: Prices are inclusive of GST.</h6>
                                    </div>
                                    <div>
                                        <IonItemDivider className="cart-divider">
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
                                        </IonItemDivider>
                                        <IonItemDivider className="cart-divider">
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
                                        </IonItemDivider>
                                        <IonItemDivider className="cart-divider">
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
                                        </IonItemDivider>
                                    </div>
                                </IonCard>
                                <div className='ion-padding billing-info-section'>
                                    <IonText>
                                        <h5 className='billing-info-cart-heading'>Billing Information</h5>
                                        <p className='billing-info-cart-text'><code>Pick a billing information</code></p>
                                    </IonText>
                                    {
                                        billingInformationLoading ? <div className='text-left mt-1 mb-1'>
                                            <IonSpinner color='dark' />
                                        </div>:
                                        <div className='billing-info-section-row'>
                                            {
                                                billingInformationData?.data.map((item, i) => <div className='billing-info-section-card-active'>
                                                    <IonIcon aria-hidden="true" icon={peopleCircleOutline} className='billing-info-section-card-icon'></IonIcon>
                                                    <IonLabel className='billing-info-section-card-text'>
                                                        <h6>{item.name}</h6>
                                                        <p>{item.email}</p>
                                                        <p>{item.phone}</p>
                                                        <p>{item.gst}</p>
                                                    </IonLabel>
                                                </div>)
                                            }
                                        </div>
                                    }
                                </div>
                                <div className='ion-padding billing-info-section'>
                                    <IonText>
                                        <h5 className='billing-info-cart-heading'>Billing Address</h5>
                                        <p className='billing-info-cart-text'><code>Pick a billing address</code></p>
                                    </IonText>
                                    {
                                        billingAddressLoading ? <div className='text-left mt-1 mb-1'>
                                            <IonSpinner color='dark' />
                                        </div>
                                        :
                                        <div className='billing-info-section-row'>
                                            {
                                                billingAddressData?.data.map((item, i) => <div className='billing-info-section-card-active'>
                                                    <IonIcon aria-hidden="true" icon={locationOutline} className='billing-info-section-card-icon'></IonIcon>
                                                    <IonLabel className='billing-info-section-card-text'>
                                                        <h6>{item.country}</h6>
                                                        <p>
                                                            {item.address}, {item.city}, {item.state} - {item.pin}, {item.country}
                                                        </p>
                                                    </IonLabel>
                                                </div>)
                                            }
                                        </div>
                                    }
                                </div>
                                <div className='ion-padding billing-info-section'>
                                    <IonText>
                                        <h5 className='billing-info-cart-heading'>Payment Option</h5>
                                        <p className='billing-info-cart-text'><code>Pick a payment option</code></p>
                                    </IonText>
                                    <div className='billing-info-section-row'>
                                        <div className='billing-info-section-card-active'>
                                            <IonIcon aria-hidden="true" icon={cashOutline} className='billing-info-section-card-icon'></IonIcon>
                                            <IonLabel className='billing-info-section-card-text'>
                                                <h6>Cash On Delivery</h6>
                                            </IonLabel>
                                        </div>
                                        <div className='billing-info-section-card'>
                                            <IonIcon aria-hidden="true" icon={cardOutline} className='billing-info-section-card-icon'></IonIcon>
                                            <IonLabel className='billing-info-section-card-text'>
                                                <h6>Pay Online - Phonepe</h6>
                                            </IonLabel>
                                        </div>
                                    </div>
                                </div>
                                <div className='ion-padding billing-info-section'>
                                    <div>
                                        <IonCheckbox labelPlacement="end" color='dark'>Use GST Invoice.</IonCheckbox>
                                    </div>
                                    <div>
                                        <IonCheckbox className='mt-1' color='dark' labelPlacement="end" checked>I agree to your Terms and Conditions.</IonCheckbox>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="cart-fixed-spacing-2"></div>
                        {
                            cart.cart.length>0 &&
                            <>
                                <IonItemDivider className="ion-padding cart-divider-total w-100" slot="fixed">
                                    <IonRow className="w-100 ion-align-items-center ion-justify-content-between">
                                        <IonCol
                                            size="6"
                                            sizeLg='6'
                                            sizeMd='6'
                                            sizeSm='6'
                                            sizeXl='6'
                                            sizeXs='6'
                                            className='text-left'
                                        >
                                            <IonText color="dark">
                                                <p className="product-detail-price m-0"><b>Total : &#8377;{cart.total_price}</b></p>
                                            </IonText>
                                        </IonCol>
                                        <IonCol
                                            size="6"
                                            sizeLg='6'
                                            sizeMd='6'
                                            sizeSm='6'
                                            sizeXl='6'
                                            sizeXs='6'
                                            className='text-right'
                                        >
                                            <IonButton className="cart-btn" fill='solid' color="dark">
                                                Place Order
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonItemDivider>
                            </>
                        }
                    </>
                }
                
            </IonContent>
        </IonPage>
    );
};

export default Cart;
