import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import './SubCategory.css';
import MainHeader from '../../components/MainHeader';
import CommonHeading from '../../components/CommonHeading';
import CategoryCard from '../../components/CategoryCard';
import ShowMoreButton from '../../components/ShowMoreButton';

const SubCategory: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={false} name='Sub Category' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <CommonHeading text='Our Sub Category' />
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
            <ShowMoreButton link='/product' />
        </IonContent>
    </IonPage>
  );
};

export default SubCategory;
