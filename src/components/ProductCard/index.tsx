import { IonButton, IonCard, IonCardHeader, IonIcon, IonImg, IonModal, IonSpinner, IonText } from "@ionic/react";
import './ProductCard.css';
import { Link } from "react-router-dom";
import CartQuantity from "../CartQuantity";
import { ProductType } from "../../helper/types";
import { useCart } from "../../hooks/useCart";
import ProductPrice from "../ProductPrice";
import { informationCircle } from "ionicons/icons";
import BulkOffer from "../BulkOffer";
import { useState } from "react";


const ProductCard: React.FC<ProductType> = ({image,name, id, slug, product_prices, min_cart_quantity, cart_quantity_interval, cart_quantity_specification}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const {quantity, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
    
    return <>
        <IonCard className="product-card">
            <Link className="no-underline" to={`/product-detail/${slug}`}>
                {
                    imgLoading &&
                    <div className="text-center mt-1">
                        <IonSpinner color='dark' />
                    </div>
                }
                <IonImg alt="product" src={image} className="product-card-image" onIonImgDidLoad={()=>setImgLoading(false)} />
            </Link>
            <IonCardHeader className="product-card-header">
                <IonText color="dark">
                    <p className="product-card-text">{name}</p>
                    <IonButton className='product-price-modal-btn' fill="clear" onClick={()=>setIsOpen(true)}>
                        <ProductPrice product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
                        <IonIcon icon={informationCircle} className='product-price-icon' />
                    </IonButton>
                </IonText>
                <CartQuantity quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
            </IonCardHeader>
        </IonCard>
        <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} id={`product-price-main-modal-${id}`} className="post-price-modal" initialBreakpoint={1} breakpoints={[0, 1]}>
            <BulkOffer product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
        </IonModal>
    </>;
    
}

export default ProductCard