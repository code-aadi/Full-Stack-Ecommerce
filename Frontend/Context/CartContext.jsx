import {  createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import fetchApi from "../utils/fetchApi";


export const cartContext = createContext()

function CartProvider ({children}){
    const {accessToken, setAccessToken} = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])
    const [cartRefresh, setCartRefresh] = useState(0)

async function addToCart(productId){
    try {
        const response = await fetchApi("http://localhost:2310/api/cart/add", {
            method : "POST",
             headers : {
                "Content-Type" : "application/json",
      Authorization : `Bearer ${accessToken}`
      
    },
    body : JSON.stringify({productId, quantity : 1})

        }, setAccessToken)
        const data = await response.json()
        if(response.ok){
            setCartRefresh(prev => prev + 1)
        }
        
    } catch (error) {
        console.log(error)
    }
    /*
    const ProductExistInCart = cartItems.find(cart => cart.id === productId)
setCartItems((prev)=>{
    if(ProductExistInCart){
     
        return prev.map(item => 
            item.id === productId ? {...item, quantity : item.quantity+1} : item
        )
    }
    return [...prev,{id: productId, quantity : 1 }]
})*/

}

useEffect(()=>{
    async function getCart(){
        if(!accessToken){
            return
        }
 try {
    const response = await fetchApi("http://localhost:2310/api/cart/get",{
    method : "GET",
    headers : {
        Authorization : `Bearer ${accessToken}`
    }
 }, setAccessToken)
 const data = await response.json()

setCartItems(data.cart.items)
 } catch (error) {
    alert("unable to fetch cart data")
 }


    }
    getCart()
},[accessToken, cartRefresh])





async function quantityIncrease(productId, currentQuantity){
const newQuantity = currentQuantity + 1

try {
const response = await fetchApi("http://localhost:2310/api/cart/quantity", {
    method : "PATCH",
    headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({newQuantity : newQuantity, productId : productId})
}, setAccessToken)
if(response.ok){
    setCartRefresh(prev => prev + 1)
}
 const data = await response.json()
console.log(data)
} catch (error) {
    console.log(error)
}
}

async function quantityDecrease(productId, currentQuantity){

const newQuantity = currentQuantity - 1

try {
    const response = await fetchApi("http://localhost:2310/api/cart/quantity", {
    method : "PATCH",
    headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({newQuantity : newQuantity, productId : productId})
},setAccessToken)
if(response.ok){
    setCartRefresh(prev => prev + 1)
}
const data = await response.json()
console.log(data)
} catch (error) {
   console.log(error) 
}

    /*
   setCartItems((prev)=>{
    const product = prev.find(item => item.id === productId)
    if(product?.quantity > 1){
        return prev.map(item => item.id === productId ? {...item, quantity : item.quantity - 1} : item)
    }
    return prev.filter(item => productId !== item.id)
   })*/

}

async function clearCart(){
   try {
    if(!confirm("Do you agree to delete your cart data?")) {
        return
    }
        setCartRefresh(prev => prev + 1)
        const response = await fetchApi("http://localhost:2310/api/cart/removeCart",{
            method : "DELETE",
            headers : {
                Authorization :  `Bearer ${accessToken}`
            }
        })
        const data = await response.json()
    } catch (error) {
        console.log(error)
    }
}
async function removeFromCart(productId){
 
    try {
        setCartRefresh(prev => prev + 1)
        const response = await fetchApi(`http://localhost:2310/api/cart/${productId}`,{
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        })
        const data = await response.json()
        
    } catch (error) {
       console.log(error) 
    }

  /*  setCartItems((prev)=>{
        return prev.filter(item => item.id !== productId)
    })*/
}

// local storage
/*
useEffect(()=>{
    localStorage.setItem("cart-data", JSON.stringify(cartItems))
},[cartItems])*/




return(
    <cartContext.Provider value={{cartItems, addToCart, quantityIncrease, quantityDecrease, clearCart, removeFromCart}}>
        {children}
    </cartContext.Provider>
)
}
export default CartProvider


