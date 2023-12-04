import { IonButton, IonIcon, IonInput, IonSpinner, SearchbarInputEventDetail } from "@ionic/react";
import React, { useEffect, useState } from "react";
import './CartQuantity.css';
import { cartOutline } from "ionicons/icons";

type CartQuantityType = {
    quantity:number;
    min_cart_quantity:number;
    loading:boolean;
    incrementQuantity:()=>void;
    decrementQuantity:()=>void;
    changeQuantity:(val:number)=>void;
}

const CartQuantity: React.FC<CartQuantityType> = ({quantity, min_cart_quantity, loading, incrementQuantity, decrementQuantity, changeQuantity}) => {
    const [qnt, setQnt] = useState(quantity);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setQnt(quantity);
      return () => {}
    }, [quantity])

    function debounce<Params extends any[]>(
        func: (...args: Params) => any,
        timeout: number,
      ): (...args: Params) => void {
        let timer: NodeJS.Timeout
        return (...args: Params) => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            func(...args)
          }, timeout)
        }
    }

    const debouncedQuatity = debounce(changeQuantity, 500);
    
    const handleChangeQuantity = (val: any) => {
        const data = parseInt(val);
        if(data<min_cart_quantity || isNaN(data)){
            setQnt(min_cart_quantity);
            debouncedQuatity(min_cart_quantity)
        }else{
            setQnt(data);
            debouncedQuatity(data)
        }
    }

    return (quantity===0 ? <IonButton fill='solid' color="dark" className="add-to-cart-btn" disabled={loading} onClick={()=>incrementQuantity()}>
                {loading ? <IonSpinner name="dots" color='light' /> : <>
                    <IonIcon slot="start" icon={cartOutline}></IonIcon>
                    Add To Cart
                </>}
            </IonButton> : 
            <div className="cart-quantity-holder">
                <div className="col-cart-quantity-auto">
                    <IonButton color='dark' size="small" className="col-cart-quantity-btn" disabled={loading} onClick={()=>decrementQuantity()}>
                        {loading ? <IonSpinner name="dots" color='light' /> : '-'}
                    </IonButton>
                </div>
                <div className="col-cart-quantity-input">
                    <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={qnt} className="text-center cart-quantity-text-holder" onIonInput={(e:CustomEvent<SearchbarInputEventDetail>)=>handleChangeQuantity(e.detail.value)} />
                </div>
                <div className="col-cart-quantity-auto">
                    <IonButton color='dark' size="small" className="col-cart-quantity-btn" disabled={loading} onClick={()=>incrementQuantity()}>
                        {loading ? <IonSpinner name="dots" color='light' /> : '+'}
                    </IonButton>
                </div>
            </div>);
}

export default CartQuantity;