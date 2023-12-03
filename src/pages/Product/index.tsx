import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Product.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import ProductCard from '../../components/ProductCard';

const Product: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={false} name='Product' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <CommonHeading text='Our Product' />
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
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/product-detail' text='Product 1' />
                    </IonCol>
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/product-detail' text='Product 1' />
                    </IonCol>
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/product-detail' text='Product 1' />
                    </IonCol>
                    <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6"
                    >
                        <ProductCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/product-detail' text='Product 1' />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Product;
