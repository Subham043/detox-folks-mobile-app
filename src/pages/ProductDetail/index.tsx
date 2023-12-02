import { IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItemDivider, IonPage, IonRow, IonText} from '@ionic/react';
import './ProductDetail.css';
import MainHeader from '../../components/MainHeader';
import Slider from '../../components/Slider';
import { cartOutline, informationCircleOutline } from 'ionicons/icons';
import CommonHeading from '../../components/CommonHeading';
import ProductCard from '../../components/ProductCard';

const ProductDetail: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={false} name='Product' link='/home' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <Slider images={[
              'https://server-api.parcelcounter.in/storage/products/l3WDnwAEYDFl0KPJqtUZErG9fUdEEvbVjlCChjxQ.webp',
              'https://server-api.parcelcounter.in/storage/products/tqX2OfAmA10hbWRg9IzFgyIzdVa1wiR4G5i7v8mh.webp'
            ]} />
            <CommonHeading text='2 Compartment Meal Tray' />
            <IonCard className='mb-1'>
              <IonCardHeader className='product-detail-card-header'>
                  <IonText color="dark">
                      <p className="product-detail-price"><b>&#8377; 2.77</b> / pieces</p>
                  </IonText>
                  <div className='bulk-offer-wrapper'>
                    <IonText>
                        <p className="fs-7-note">Note: Prices are inclusive of GST.</p>
                    </IonText>
                    <IonText>
                        <h6>Bulk Offer :</h6>
                    </IonText>
                    <hr />
                    <ul>
                      <li>
                        <div className="bulk-offer-text">
                          <IonIcon icon={informationCircleOutline} /> 
                          <span>Buy 50 pieces or more at ₹6.13/pieces</span>
                        </div>
                      </li>
                    </ul>
                  </div>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <div className='specification-heading'>
                <h6>Specification</h6>
              </div>
              <div>
                  <IonItemDivider className="specification-divider">
                      <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                          <IonCol
                              size="6"
                              className='text-left'
                          >
                            <IonText>
                              <p className='specification-text'><code>MRP</code></p>
                            </IonText>
                          </IonCol>
                          <IonCol
                              size="6"
                              className='text-right'
                          >
                            <IonText>
                              <p className='specification-text'><b>Rs. 100</b></p>
                            </IonText>
                          </IonCol>
                      </IonRow>
                  </IonItemDivider>
                  <IonItemDivider className="specification-divider">
                      <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                          <IonCol
                              size="6"
                              className='text-left'
                          >
                            <IonText>
                              <p className='specification-text'><code>Discount</code></p>
                            </IonText>
                          </IonCol>
                          <IonCol
                              size="6"
                              className='text-right'
                          >
                            <IonText>
                              <p className='specification-text'><b>1%</b></p>
                            </IonText>
                          </IonCol>
                      </IonRow>
                  </IonItemDivider>
                  <IonItemDivider className="specification-divider">
                      <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                          <IonCol
                              size="6"
                              className='text-left'
                          >
                            <IonText>
                              <p className='specification-text'><code>Our Price</code></p>
                            </IonText>
                          </IonCol>
                          <IonCol
                              size="6"
                              className='text-right'
                          >
                            <IonText>
                              <p className='specification-text'><b>Rs. 100</b></p>
                            </IonText>
                          </IonCol>
                      </IonRow>
                  </IonItemDivider>
              </div>
            </IonCard>
            <CommonHeading text='Related Products' />
            <IonGrid>
                <IonRow className="ion-align-items-center ion-justify-content-between">
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Product 1' />
                    </IonCol>
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Product 1' />
                    </IonCol>
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Product 1' />
                    </IonCol>
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Product 1' />
                    </IonCol>
                </IonRow>
            </IonGrid>
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
                            <p className="product-detail-price m-0"><b>&#8377; 2.77</b> / pieces</p>
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
                            <IonIcon icon={cartOutline} slot="start"></IonIcon> Add To Cart
                        </IonButton>
                        {/* <div className="quantity-holder">
                            <div className="col-auto">
                              <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                -
                              </IonButton>
                            </div>
                            <div className="col-3">
                              <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={1} className="text-center quantity-text-holder"></IonInput>
                            </div>
                            <div className="col-auto">
                              <IonButton color={'success'} size="small" className="m-0 h-100 p-0">
                                +
                              </IonButton>
                            </div>
                        </div> */}
                    </IonCol>
                </IonRow>
            </IonItemDivider>
        </IonContent>
    </IonPage>
  );
};

export default ProductDetail;
