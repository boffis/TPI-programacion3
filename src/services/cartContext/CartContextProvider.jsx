import { useState, useEffect } from "react"
import { CartContext } from "./CartContext";

const Cart = JSON.parse(localStorage.getItem('CurrentCart'))

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState(Cart || []);

    useEffect(() => {
    localStorage.setItem("CurrentCart", JSON.stringify(cart));
    }, [cart]);

    const handleAdd = (product) => {
        setCart(PreviousCart=>{
            return[
                ...PreviousCart,
                {...product, quantity:1}
            ]
        });
    }

    const handleDelete = (id) => {
        setCart(PreviousCart=>{
            return(PreviousCart.filter(e=>e.id!=id))
        });
    }

    const handleUpdate = (id, increase) => {
        //increase is boolean 
        setCart((PreviousCart)=>{
            let toDelete = null
            let newCart = PreviousCart.map((e, index)=> {
                // e.quant if modded doubles modification
                let newQuantity = e.quantity;
                if (e.id === id) {
                    if (increase && e.quantity < e.stock) {
                        newQuantity++
                    } else if (!increase) {
                        newQuantity--
                        newQuantity === 0 ? toDelete = index : null
                    }
                }
                return {...e, quantity : newQuantity}
            })
            if (toDelete!==null) {
                newCart = newCart.filter((e, i) => i !== toDelete)
            }
            return(
                newCart
            )
        });        

    }

    const handleBuy = () => {
        setCart([])
    }

    return (
        <CartContext
            value={{
                cart,
                onAdd: handleAdd,
                onDelete: handleDelete,
                onUpdate: handleUpdate,
                onBuy: handleBuy
            }}>
            {children}
        </CartContext>
    )
}

export default CartContextProvider