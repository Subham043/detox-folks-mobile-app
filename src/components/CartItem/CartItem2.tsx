import { IonImg, IonLabel, IonSpinner, IonText } from "@ionic/react";
import React, { useState } from "react";
import CartQuantity from "../CartQuantity";
import { CartType } from "../../helper/types";
import { useCart } from "../../hooks/useCart";
import './CartItem.css';

const CartItem2: React.FC<CartType> = ({ product, product_price, amount }) => {
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const {quantity, cartItemLoading, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});

    return <div className="cart-item-container">
        <div className="cart-item-row">
            <div className="cart-item-col">
                <div className="cart-item-img-container">
                    {
                        imgLoading &&
                        <div className="text-center mt-1">
                            <IonSpinner color='dark' />
                        </div>
                    }
                    <IonImg alt="product" className='cart-card-item-img' src={product.image} onIonImgDidLoad={()=>setImgLoading(false)} />
                </div>
                <div>
                    <IonLabel className="cart-card-item-text">
                        <p>{product.name}</p>
                    </IonLabel>
                    <p className="cart-card-item-price"><b>&#8377;{product_price.discount_in_price}</b> / {product.cart_quantity_specification}</p>
                </div>
            </div>
            <div className="cart-item-quantity">
                <CartQuantity quantity={quantity} min_cart_quantity={product.min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
                <p className='cart-item-total-price'>&#8377;{amount}</p>
            </div>
        </div>
    </div>
};

export default CartItem2;