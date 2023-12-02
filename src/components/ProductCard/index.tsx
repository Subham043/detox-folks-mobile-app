import { IonButton, IonCard, IonCardHeader, IonIcon, IonImg, IonText } from "@ionic/react";
import './ProductCard.css';
import { Link } from "react-router-dom";
import { cartOutline } from "ionicons/icons";

type Props = {
    text: string;
    link: string;
    image: string;
}

const ProductCard: React.FC<Props> = ({text, image, link}) => <IonCard className="product-card">
    <Link className="no-underline" to={link}>
        <IonImg alt="product" src={image} />
    </Link>
    <IonCardHeader className="product-card-header">
        <IonText color="dark">
            <p className="product-card-text">{text}</p>
            <p className="product-card-price"><b>&#8377; 2.77</b> / pieces</p>
        </IonText>
        <IonButton fill='solid' color="dark" className="add-to-cart-btn">
            <IonIcon slot="start" icon={cartOutline}></IonIcon>
            Add To Cart
        </IonButton>
    </IonCardHeader>
</IonCard>

export default ProductCard