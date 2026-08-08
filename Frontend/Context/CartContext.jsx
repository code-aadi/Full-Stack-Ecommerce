import {  createContext, useEffect, useState } from "react";


export const cartContext = createContext()

function CartProvider ({children}){
    const [cartItems, setCartItems] = useState(()=>{
        const localData = localStorage.getItem("cart-data")
        return localData ? JSON.parse(localData) : []
    })

function addToCart(productId){
    const ProductExistInCart = cartItems.find(cart => cart.id === productId)
setCartItems((prev)=>{
    if(ProductExistInCart){
     
        return prev.map(item => 
            item.id === productId ? {...item, quantity : item.quantity+1} : item
        )
    }
    return [...prev,{id: productId, quantity : 1 }]
})

}

function quantityIncrease(productId){
setCartItems((prev)=>{
    return  prev.map((item)=>{
    return productId === item.id ? {...item, quantity : item.quantity + 1} : item
 })
})
 
}

function quantityDecrease(productId){
   setCartItems((prev)=>{
    const product = prev.find(item => item.id === productId)
    if(product?.quantity > 1){
        return prev.map(item => item.id === productId ? {...item, quantity : item.quantity - 1} : item)
    }
    return prev.filter(item => productId !== item.id)
   })

}

function clearCart(){
    setCartItems([])
}
function removeFromCart(productId){
    setCartItems((prev)=>{
        return prev.filter(item => item.id !== productId)
    })
}

// local storage

useEffect(()=>{
    localStorage.setItem("cart-data", JSON.stringify(cartItems))
},[cartItems])



return(
    <cartContext.Provider value={{cartItems, addToCart, quantityIncrease, quantityDecrease, clearCart, removeFromCart}}>
        {children}
    </cartContext.Provider>
)
}
export default CartProvider