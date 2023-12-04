import { IonCol, IonImg, IonItemDivider, IonRow, IonText } from "@ionic/react";
import React from "react";
import CartQuantity from "../CartQuantity";
import { CartType } from "../../helper/types";
import { useCart } from "../../hooks/useCart";
import './CartItem.css';

const CartItem: React.FC<CartType> = ({ product, product_price, amount }) => {
    const {quantity, cartItemLoading, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});

    return <IonItemDivider className="cart-divider">
        <IonRow className="ion-align-items-center ion-justify-content-between w-100">
            <IonCol
                size="5"
                className='text-left'
            >
            <IonImg alt="product" className='cart-card-item-img' src={product.image} />
            <IonText color="dark">
                <p className="cart-card-item-text">{product.name}</p>
                <p className="cart-card-item-price"><b>&#8377;{product_price.discount_in_price}</b> / {product.cart_quantity_specification}</p>
            </IonText>
            </IonCol>
            <IonCol
                size="5"
                className='text-left'
            >
                <CartQuantity quantity={quantity} min_cart_quantity={product.min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
            </IonCol>
            <IonCol
                size="2"
                className='text-right'
            >
                <p className='cart-text'>&#8377;{amount}</p>
            </IonCol>
        </IonRow>
    </IonItemDivider>
};

export default CartItem;