import { IonButton, IonCard, IonCol, IonContent, IonItemDivider, IonPage, IonRow, IonText } from '@ionic/react';
import './Cart.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import EmptyCart from '../../components/EmptyCart';
import { CartContext } from '../../context/CartProvider';
import { useContext, useEffect } from 'react';
import CartItem from '../../components/CartItem';
import { useSWRConfig } from 'swr';
import { api_routes } from '../../helper/routes';
import { AuthContext } from '../../context/AuthProvider';
import { useLocation } from 'react-router';

const Cart: React.FC = () => {
    const { cart } = useContext(CartContext);
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const { mutate } = useSWRConfig();
    useEffect(()=>{
        let isMounted = true;
        if(isMounted && auth.authenticated && location.pathname==='/cart'){
            mutate(api_routes.cart_all);
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
                    </>
                }
                <div className="cart-fixed-spacing-2"></div>
                {
                    cart.cart.length>0 &&
                    <>
                        <div className="cart-fixed-spacing-2"></div>
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
                
            </IonContent>
        </IonPage>
    );
};

export default Cart;
