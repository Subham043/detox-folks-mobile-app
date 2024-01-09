import { IonContent, IonPage } from '@ionic/react';
import CategorySection from '../../components/CategorySection';
import MainHeader from '../../components/MainHeader';
import ViewCartBtn from '../../components/ViewCartBtn';

const Category: React.FC = () => <IonPage>
    <MainHeader isMainHeader={true} />
    <IonContent
        fullscreen={false}
        forceOverscroll={false}
    >
        <CategorySection inHomePage={false} />
        <ViewCartBtn />
    </IonContent>
</IonPage>

export default Category;
