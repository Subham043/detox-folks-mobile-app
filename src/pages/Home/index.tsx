import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './Home.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import ShowMoreButton from '../../components/ShowMoreButton';
import ProductCard from '../../components/ProductCard';

const Home: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <CommonHeading text='Our Category' />
            <IonGrid>
                <IonRow className="ion-align-items-center ion-justify-content-between">
                    <IonCol
                        size="4"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="4"
                        size-xs="4"
                    >
                        <CategoryCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Category 1' />
                    </IonCol>
                    <IonCol
                        size="4"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="4"
                        size-xs="4"
                    >
                        <CategoryCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Category 1' />
                    </IonCol>
                    <IonCol
                        size="4"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="4"
                        size-xs="4"
                    >
                        <CategoryCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Category 1' />
                    </IonCol>
                    <IonCol
                        size="4"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="4"
                        size-xs="4"
                    >
                        <CategoryCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Category 1' />
                    </IonCol>
                    <IonCol
                        size="4"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="4"
                        size-xs="4"
                    >
                        <CategoryCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Category 1' />
                    </IonCol>
                    <IonCol
                        size="4"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="4"
                        size-xs="4"
                    >
                        <CategoryCard image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' link='/category/1' text='Category 1' />
                    </IonCol>
                </IonRow>
            </IonGrid>
            <ShowMoreButton link='/category' />
            <CommonHeading text='Our Featured Products' />
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
            <ShowMoreButton link='/home' />
        </IonContent>
    </IonPage>
  );
};

export default Home;
