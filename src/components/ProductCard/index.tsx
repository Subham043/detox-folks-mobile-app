import { IonCard, IonCardHeader, IonImg, IonText } from "@ionic/react";
import './ProductCard.css';
import { Link } from "react-router-dom";
import CartQuantity from "../CartQuantity";
import { ProductType } from "../../helper/types";
import { useCart } from "../../hooks/useCart";


const ProductCard: React.FC<ProductType> = ({image,name, id, slug, product_prices, min_cart_quantity, cart_quantity_interval}) => {
    const {quantity, cartLoading, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
    return <IonCard className="product-card">
        <Link className="no-underline" to={`/product-detail/${slug}`}>
            <IonImg alt="product" src={image} className="product-card-image" />
        </Link>
        <IonCardHeader className="product-card-header">
            <IonText color="dark">
                <p className="product-card-text">{name}</p>
                <p className="product-card-price"><b>&#8377; 2.77</b> / pieces</p>
            </IonText>
            <CartQuantity quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
        </IonCardHeader>
    </IonCard>;
}

export default ProductCard