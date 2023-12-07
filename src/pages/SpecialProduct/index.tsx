import { IonContent, IonPage } from '@ionic/react';
import './SpecialProduct.css';
import MainHeader from '../../components/MainHeader';
import SpecialProductSection from '../../components/SpecialProductSection';
import { RouteComponentProps } from 'react-router';
import { useCallback } from 'react';

interface SpecialProductProps extends RouteComponentProps<{
    slug: "is_featured" | "is_new" | "is_on_sale" | undefined;
}> {}

const SpecialProduct: React.FC<SpecialProductProps> = ({match}) => {

    const name = useCallback<(slug:"is_featured" | "is_new" | "is_on_sale" | undefined)=>string>((slug) => {
        switch (slug) {
            case 'is_featured':
                return "Our Featured Products"
            case 'is_new':
                return "Our New Products"
            case 'is_on_sale':
                return "On Sale Products"
            default:
                return "Our Featured Products"
        }
    }, [match.params.slug]) 

    return (
        <IonPage>
            <MainHeader isMainHeader={false} name={name(match.params.slug)} />
            <IonContent
            fullscreen={false}
            forceOverscroll={false}
            >
                <SpecialProductSection inHomePage={false} slug={match.params.slug} name={name(match.params.slug)} />
            </IonContent>
        </IonPage>
    );
};

export default SpecialProduct;