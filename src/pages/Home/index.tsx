import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import MainHeader from '../../components/MainHeader';
import CategorySection from '../../components/CategorySection';
import SpecialProductSliderSection from '../../components/SpecialProductSection/SpecialProductSliderSection';
import Slider from '../../components/Slider';
import ViewCartBtn from '../../components/ViewCartBtn';
import PreviouslyOrdered from '../../components/PreviouslyOrdered';

const images = [
  '/images/banner-5.jpg',
  '/images/banner-4.jpg',
  '/images/banner-1.jpg',
  '/images/banner-2.jpg',
  '/images/banner-3.jpg',
];

const Home: React.FC = () => {
  return (
    <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
            <div className='home-slider'>
              <Slider images={images} />
            </div>
            <PreviouslyOrdered />
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
