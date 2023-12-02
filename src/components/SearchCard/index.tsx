import { IonImg, IonText } from "@ionic/react";
import './SearchCard.css';
import { Link } from "react-router-dom";

type Props = {
    text: string;
    type: string;
    link: string;
    image: string;
}

const SearchCard: React.FC<Props> = ({text, image, link, type}) => <Link className="no-underline search-card" to={link}>
    <IonImg class='search-card-img' alt="product" src={image} />
    <IonText color="dark">
        <p className="search-card-text">{text}</p>
        <p className="search-card-price">{type}</p>
    </IonText>
</Link>

export default SearchCard