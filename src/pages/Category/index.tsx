import { IonContent, IonPage } from '@ionic/react';
import CategorySection from '../../components/CategorySection';
import MainHeader from '../../components/MainHeader';

const Category: React.FC = () => <IonPage>
    <MainHeader isMainHeader={true} />
    <IonContent
        fullscreen={false}
        forceOverscroll={false}
    >
        <CategorySection inHomePage={false} />
    </IonContent>
</IonPage>

export default Category;
