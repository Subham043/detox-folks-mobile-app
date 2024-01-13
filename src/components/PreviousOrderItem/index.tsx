import { IonImg, IonLabel, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import CartQuantity from "../CartQuantity";
import { ProductType } from "../../helper/types";
import { useCart } from "../../hooks/useCart";
import './PreviouseOrderItem.css';
import ProductPrice from "../ProductPrice";

const PreviouseOrderItem: React.FC<ProductType> = ({image, name, id, product_prices, min_cart_quantity, cart_quantity_interval, cart_quantity_specification}) => {
    const {quantity, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    return <>
        <div className="cart-item-container">
            <div className="cart-item-row">
                <div className="cart-item-col">
                    <div className="cart-item-img-container">
                        <div className="p-relative">
                            {
                                imgLoading &&
                                <div className="text-center img-loader">
                                    <IonSpinner color='dark' />
                                </div>
                            }
                            <IonImg alt="product" className='cart-card-item-img' src={image} onIonImgDidLoad={()=>setImgLoading(false)} />
                        </div>
                    </div>
                    <div className="cart-item-text-container">
                        <IonLabel className="cart-card-item-text">
                            <p>{name}</p>
                        </IonLabel>
                        <div className="order-product-card-price-container">
                            <ProductPrice product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
                        </div>
                    </div>
                </div>
                <div className="cart-item-quantity">
                    <CartQuantity quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
                </div>
            </div>
        </div>
    </>
};

export default PreviouseOrderItem;