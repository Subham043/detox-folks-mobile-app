import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import MainHeader from '../../components/MainHeader';
import CategorySection from '../../components/CategorySection';
import SpecialProductSection from '../../components/SpecialProductSection';
import SpecialProductSliderSection from '../../components/SpecialProductSection/SpecialProductSliderSection';

const Home: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <CategorySection inHomePage={true} />
            <SpecialProductSliderSection slug='is_featured' name='Our Featured Products' />
            <SpecialProductSliderSection slug='is_new' name='Our New Products' />
            <SpecialProductSliderSection slug='is_on_sale' name='On Sale Products' />
        </IonContent>
    </IonPage>
  );
};

export default Home;
