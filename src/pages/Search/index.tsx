import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import './Search.css';
import SearchCard from '../../components/SearchCard';

const Search: React.FC = () => {
  return (
    <IonPage>
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref='/home'></IonBackButton>
                </IonButtons>
                <IonSearchbar showClearButton="focus" debounce={500} placeholder="Type to search..." className='search-input' />
            </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <IonGrid>
                <IonRow className="ion-align-items-center ion-justify-content-between">
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                    <IonCol
                        size="12"
                    >
                        <SearchCard link='/home' image='https://server-api.parcelcounter.in/storage/categories/ZcNbbUfRJLes1OME1OZWJGBnMPQJGzSHMEpoAjm7.jpg' text='Product 1' type='Category' />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Search;
