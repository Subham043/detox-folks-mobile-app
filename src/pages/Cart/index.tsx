import { IonButton, IonCard, IonCol, IonContent, IonItemDivider, IonPage, IonRow, IonText } from '@ionic/react';
import './Cart.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import EmptyCart from '../../components/EmptyCart';
import { CartContext } from '../../context/CartProvider';
import { useContext } from 'react';
import CartItem from '../../components/CartItem';

const Cart: React.FC = () => {
    const { cart } = useContext(CartContext);

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
                    <IonCard className="cart-card">
                        {
                            cart.cart.map((item, i) => <CartItem {...item} key={i} />)
                        }
                    </IonCard>
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
