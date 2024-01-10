import { IonIcon, IonImg, IonModal, useIonRouter } from "@ionic/react";
import './MainProductCard.css';
import { ProductType } from "../../helper/types";
import { useCart } from "../../hooks/useCart";
import ProductPrice from "../ProductPrice";
import { informationCircle } from "ionicons/icons";
import BulkOffer from "../BulkOffer";
import { useState } from "react";
import CartQuantity2 from "../CartQuantity/CartQuantity2";


const MainProductCard: React.FC<ProductType> = ({image,name, id, slug, product_prices, min_cart_quantity, cart_quantity_interval, cart_quantity_specification}) => {
    const router = useIonRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {quantity, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
    
    return <>
        <div className="product-card product-card-main">
            <div className="product-main-link">
                <button className="product-main-img-btn" onClick={()=>router.push(`/product-detail/${slug}`)}>
                    <IonImg alt="product" src={image} className="product-card-image" />
                </button>
                <div className="product-text-container-gradient">
                    <div className="page-padding product-card-header-container">
                        <h4>{name}</h4>
                    </div>
                    <div className="page-padding product-card-price-container">
                        <div className="col-auto">
                            <ProductPrice product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
                            <button className='product-price-modal-btn' onClick={()=>setIsOpen(true)}>
                                <p>Bulk Offer</p>
                                <IonIcon icon={informationCircle} className='product-price-icon' />
                            </button>
                        </div>
                        <div className="col-auto cart-quantity-col">
                            <CartQuantity2 quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} id={`product-price-main-modal-${id}`} className="post-price-modal" initialBreakpoint={1} breakpoints={[0, 1]}>
            <BulkOffer product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
        </IonModal>
    </>;
    
}

export default MainProductCard