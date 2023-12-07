import { IonBadge, IonCard, IonCol, IonContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText, RefresherEventDetail } from '@ionic/react';
import './OrderDetail.css';
import MainHeader from '../../components/MainHeader';
import useSWR from 'swr'
import { OrderResponseType, OrderType } from '../../helper/types';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { api_routes } from '../../helper/routes';
import { RouteComponentProps } from 'react-router';
import { callOutline, homeOutline, mailOutline, personOutline } from 'ionicons/icons';
import LoadingCard from '../../components/LoadingCard';

interface OrderProps extends RouteComponentProps<{
    slug: string;
}> {}

const OrderDetail: React.FC<OrderProps> = ({match}) =>{

    const {auth} = useContext(AuthContext);
    const { data:order, isLoading:loading, mutate } = useSWR<{order: OrderType}>(auth.authenticated ? api_routes.place_order_detail + `/${match.params.slug}` : null);

    return <IonPage>
        <MainHeader isMainHeader={false} name={`Order#${order?.order.id}`} />
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
            {
                loading ? <LoadingCard itemCount={4} column={12} height='170px' /> :
                order &&
                <>
                    <div className='cart-message mt-0'>
                        <p>You have realized a minimum savings of 20% - 25% on your standard purchase when compared to retail price.</p>
                    </div>
                    <div className='order-detail-padding'>
                        <IonRow className="ion-align-items-end ion-justify-content-between w-100">
                            <IonCol
                                size="8"
                                className='text-left'
                            >
                                <IonText>
                                    <p className='order-card-product-order-id order-detail-id'>
                                        Order#{order.order.id}
                                    </p>
                                    <p className='order-card-product-timestamp'>
                                        Placed: {order.order.created_at}
                                    </p>
                                </IonText>
                            </IonCol>
                            <IonCol
                                size="4"
                                className='text-right'
                            >
                                <IonBadge color="dark">{order.order.statuses.length>0 ? order.order.statuses[order.order.statuses.length-1].status : 'PROCESSING'}</IonBadge>
                            </IonCol>
                        </IonRow>
                    </div>
                    <IonCard className="cart-card">
                        {
                            order.order.products.map((item, i) => <IonItemDivider className="cart-divider" key={i}>
                                <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                    <IonCol
                                        size="7"
                                        className='text-left'
                                    >
                                        <div className='order-item-detail-wrapper'>
                                            <IonImg alt="product" className='cart-card-item-img order-item-img' src={item.image} />
                                            <IonText color="dark" class='order-item-text'>
                                                <p className="cart-card-item-text order-item-name">{item.name}</p>
                                                <p className="cart-card-item-price"><b>&#8377;{item.discount_in_price}</b> / pieces</p>
                                            </IonText>
                                        </div>
                                    </IonCol>
                                    <IonCol
                                        size="3"
                                        className='text-center'
                                    >
                                        <p className='order-detail-price-text'>Qty: {item.quantity}</p>
                                    </IonCol>
                                    <IonCol
                                        size="2"
                                        className='text-right'
                                    >
                                        <p className='order-detail-price-text'>&#8377;{item.amount}</p>
                                    </IonCol>
                                </IonRow>
                            </IonItemDivider>)
                        }
                    </IonCard>
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
                                        <p className='order-detail-price-text'>Sub Total</p>
                                        </IonText>
                                    </IonCol>
                                    <IonCol
                                        size="6"
                                        className='text-right'
                                    >
                                        <IonText>
                                        <p className='order-detail-price-text'><b>&#8377;{order.order.subtotal}</b></p>
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
                                        <p className='order-detail-price-text'>Delivery Charges</p>
                                        </IonText>
                                    </IonCol>
                                    <IonCol
                                        size="6"
                                        className='text-right'
                                    >
                                        <IonText>
                                        <p className='order-detail-price-text'><b>Free</b></p>
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
                                        <p className='order-detail-price-text'><code>Total</code></p>
                                        </IonText>
                                    </IonCol>
                                    <IonCol
                                        size="6"
                                        className='text-right'
                                    >
                                        <IonText>
                                        <p className='order-detail-price-text'><b>&#8377;{order.order.total_price}</b></p>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                            </IonItemDivider>
                        </div>
                    </IonCard>
                    <IonCard>
                        <div className='specification-heading mb-1'>
                            <h6>Payment Information</h6>
                        </div>
                        <div>
                            <IonItemDivider className="cart-divider">
                                <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                                    <IonCol
                                        size="6"
                                        className='text-left'
                                    >
                                        <IonText>
                                        <p className='order-detail-price-text'>Payment Mode</p>
                                        </IonText>
                                    </IonCol>
                                    <IonCol
                                        size="6"
                                        className='text-right'
                                    >
                                        <IonText>
                                        <p className='order-detail-price-text'><b>&#8377;{order.order.payment.mode}</b></p>
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
                                        <p className='order-detail-price-text'>Payment Status</p>
                                        </IonText>
                                    </IonCol>
                                    <IonCol
                                        size="6"
                                        className='text-right'
                                    >
                                        <IonBadge color="dark">{order.order.payment.status}</IonBadge>
                                    </IonCol>
                                </IonRow>
                            </IonItemDivider>
                        </div>
                    </IonCard>
                    <IonCard className="mt-1">
                        <div className='specification-heading mb-0'>
                            <h6>Billing Information</h6>
                        </div>
                        <div>
                            <IonItem lines="inset">
                                <IonIcon icon={personOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                                <IonLabel>
                                    <p className='order-detail-personal-info'>{order.order.name}</p>
                                </IonLabel>
                            </IonItem>
                            <IonItem lines="inset">
                                <IonIcon icon={mailOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                                <IonLabel>
                                    <p className='order-detail-personal-info'>{order.order.email}</p>
                                </IonLabel>
                            </IonItem>
                            <IonItem lines="inset">
                                <IonIcon icon={callOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                                <IonLabel>
                                    <p className='order-detail-personal-info'>{order.order.phone}</p>
                                </IonLabel>
                            </IonItem>
                            <IonItem lines="inset">
                                <IonIcon icon={homeOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                                <IonLabel className="ion-text-wrap">
                                    <p className='order-detail-personal-info'>{order.order.address}, {order.order.city}, {order.order.state} - {order.order.pin}, {order.order.country}</p>
                                </IonLabel>
                            </IonItem>
                        </div>
                    </IonCard>
                </>
            }
        </IonContent>
    </IonPage>
}

export default OrderDetail;