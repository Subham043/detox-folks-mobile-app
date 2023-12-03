import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import MainHeader from '../../components/MainHeader';
import CategorySection from '../../components/CategorySection';
import SpecialProductSection from '../../components/SpecialProductSection';

const Home: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <CategorySection />
            <SpecialProductSection slug='is_featured' name='Our Featured Products' />
            <SpecialProductSection slug='is_new' name='Our New Products' />
            <SpecialProductSection slug='is_on_sale' name='On Sale Products' />
        </IonContent>
    </IonPage>
  );
};

export default Home;
