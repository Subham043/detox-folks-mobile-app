import { IonButton, IonCard, IonCol, IonContent, IonIcon, IonImg, IonInput, IonItemDivider, IonPage, IonRow, IonText } from '@ionic/react';
import './Cart.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import EmptyCart from '../../components/EmptyCart';

const Cart: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <CommonHeading text='Cart' />
            <EmptyCart />
            <IonCard className="cart-card">
                <IonItemDivider className="cart-divider">
                    <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                        <IonCol
                            size="5"
                            className='text-left'
                        >
                        <IonImg alt="product" className='cart-card-item-img' src='https://server-api.parcelcounter.in/storage/products/l3WDnwAEYDFl0KPJqtUZErG9fUdEEvbVjlCChjxQ.webp' />
                        <IonText color="dark">
                            <p className="cart-card-item-text">2 Compartment Meal Tray</p>
                            <p className="cart-card-item-price"><b>&#8377; 2.77</b> / pieces</p>
                        </IonText>
                        </IonCol>
                        <IonCol
                            size="5"
                            className='text-left'
                        >
                            <div className="cart-quantity-holder">
                                <div className="col-cart-quantity-auto">
                                    <IonButton color='dark' size="small" className="col-cart-quantity-btn">
                                        -
                                    </IonButton>
                                </div>
                                <div className="col-cart-quantity-input">
                                    <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={100} className="text-center cart-quantity-text-holder"></IonInput>
                                </div>
                                <div className="col-cart-quantity-auto">
                                    <IonButton color='dark' size="small" className="col-cart-quantity-btn">
                                        +
                                    </IonButton>
                                </div>
                            </div>
                        </IonCol>
                        <IonCol
                            size="2"
                            className='text-right'
                        >
                            <p className='cart-text'>&#8377;100</p>
                        </IonCol>
                    </IonRow>
                </IonItemDivider>
                <IonItemDivider className="cart-divider">
                    <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                        <IonCol
                            size="5"
                            className='text-left'
                        >
                        <IonImg alt="product" className='cart-card-item-img' src='https://server-api.parcelcounter.in/storage/products/l3WDnwAEYDFl0KPJqtUZErG9fUdEEvbVjlCChjxQ.webp' />
                        <IonText color="dark">
                            <p className="cart-card-item-text">2 Compartment Meal Tray</p>
                            <p className="cart-card-item-price"><b>&#8377; 2.77</b> / pieces</p>
                        </IonText>
                        </IonCol>
                        <IonCol
                            size="5"
                            className='text-left'
                        >
                            <div className="cart-quantity-holder">
                                <div className="col-cart-quantity-auto">
                                    <IonButton color='dark' size="small" className="col-cart-quantity-btn">
                                        -
                                    </IonButton>
                                </div>
                                <div className="col-cart-quantity-input">
                                    <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={100} className="text-center cart-quantity-text-holder"></IonInput>
                                </div>
                                <div className="col-cart-quantity-auto">
                                    <IonButton color='dark' size="small" className="col-cart-quantity-btn">
                                        +
                                    </IonButton>
                                </div>
                            </div>
                        </IonCol>
                        <IonCol
                            size="2"
                            className='text-right'
                        >
                            <p className='cart-text'>&#8377;100</p>
                        </IonCol>
                    </IonRow>
                </IonItemDivider>
                <IonItemDivider className="cart-divider">
                    <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                        <IonCol
                            size="5"
                            className='text-left'
                        >
                        <IonImg alt="product" className='cart-card-item-img' src='https://server-api.parcelcounter.in/storage/products/l3WDnwAEYDFl0KPJqtUZErG9fUdEEvbVjlCChjxQ.webp' />
                        <IonText color="dark">
                            <p className="cart-card-item-text">2 Compartment Meal Tray</p>
                            <p className="cart-card-item-price"><b>&#8377; 2.77</b> / pieces</p>
                        </IonText>
                        </IonCol>
                        <IonCol
                            size="5"
                            className='text-left'
                        >
                            <div className="cart-quantity-holder">
                                <div className="col-cart-quantity-auto">
                                    <IonButton color='dark' size="small" className="col-cart-quantity-btn">
                                        -
                                    </IonButton>
                                </div>
                                <div className="col-cart-quantity-input">
                                    <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={100} className="text-center cart-quantity-text-holder"></IonInput>
                                </div>
                                <div className="col-cart-quantity-auto">
                                    <IonButton color='dark' size="small" className="col-cart-quantity-btn">
                                        +
                                    </IonButton>
                                </div>
                            </div>
                        </IonCol>
                        <IonCol
                            size="2"
                            className='text-right'
                        >
                            <p className='cart-text'>&#8377;100</p>
                        </IonCol>
                    </IonRow>
                </IonItemDivider>
            </IonCard>
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
                            <p className="product-detail-price m-0"><b>&#8377; 2.77</b></p>
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
            
        </IonContent>
    </IonPage>
  );
};

export default Cart;
