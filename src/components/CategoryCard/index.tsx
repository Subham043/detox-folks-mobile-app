import { IonCard, IonCardHeader, IonImg, IonText } from "@ionic/react";
import './CategoryCard.css';
import { Link } from "react-router-dom";

type Props = {
    text: string;
    link: string;
    image: string;
}

const CategoryCard: React.FC<Props> = ({text, image, link}) => <Link className="no-underline" to={link}>
    <IonCard className="category-card">
        <IonImg alt="category" src={image} class="category-card-image" />
        <IonCardHeader className="category-card-header">
            <IonText color="dark">
                <p className="category-card-text">{text}</p>
            </IonText>
        </IonCardHeader>
    </IonCard>
</Link>

export default CategoryCard