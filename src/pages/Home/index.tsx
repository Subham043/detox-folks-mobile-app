import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import MainHeader from '../../components/MainHeader';
import CategorySection from '../../components/CategorySection';
import SpecialProductSliderSection from '../../components/SpecialProductSection/SpecialProductSliderSection';
import Slider from '../../components/Slider';
import ViewCartBtn from '../../components/ViewCartBtn';

const images = [
  '/images/b1.webp',
  '/images/b2.webp',
  '/images/b3.webp',
  '/images/b4.webp',
];

const Home: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <div className='ion-padding page-padding home-slider'>
              <Slider images={images} />
            </div>
            <CategorySection inHomePage={true} />
            <SpecialProductSliderSection slug='is_featured' name='Exclusive Products' />
            <SpecialProductSliderSection slug='is_new' name='Eco-Friendly Products' />
            <SpecialProductSliderSection slug='is_on_sale' name='On Demand Products' />
            <ViewCartBtn />
        </IonContent>
    </IonPage>
  );
};

export default Home;
