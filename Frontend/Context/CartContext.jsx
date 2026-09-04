import {  createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import fetchApi from "../utils/fetchApi";


export const cartContext = createContext()
function CartProvider ({children}){
    const {user} = useContext(AuthContext)
    const {accessToken, setAccessToken} = useContext(AuthContext)
    const [cartLoading, setCartLoading] = useState(false)

    const [cartItems, setCartItems] = useState([]);
const [localCart, setLocalCart] = useState(() => JSON.parse(localStorage.getItem("cart-data") || '[]'));
    const [cartRefresh, setCartRefresh] = useState(0)

const cartItemsObj = {}
localCart?.forEach(item => {
  cartItemsObj[item._id] = item.quantity
});

async function addToCart(productId){
    if(user){
        try {
        const response = await fetchApi("http://localhost:2310/api/cart/add", {
            method : "POST",
             headers : {
                "Content-Type" : "application/json",
      Authorization : `Bearer ${accessToken}`
      
    },
    body : JSON.stringify({productId ,  quantity : 1})

        }, setAccessToken)
        const data = await response.json()
        if(response.ok){
            setCartRefresh(prev => prev + 1)
        }
        
    } catch (error) {
        console.log(error)
    }
    }
    else{
        setCartRefresh(prev => prev + 1)
        setLocalCart((prev)=>{
    const ProductExistInCart = prev.find(cart => cart._id === productId)
    if(ProductExistInCart){
     
        return prev.map(item => 
            item._id === productId ? {...item, quantity : item.quantity+1} : item
        )
    }
    return [...prev,{_id : productId, quantity : 1 }]
})
    }
    

}


useEffect(()=>{
    async function getCart(){
        setCartLoading(true)
       
if(user){
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
 }finally{
    setCartLoading(false)
 }
} else{
      

    const ids = localCart?.map((cart) => cart._id)

   if(!ids|| ids.length === 0){
  setCartItems([])
    return
   }
 try {
    
    const response = await fetch("http://localhost:2310/api/cart/localCart",{
        method : "POST",
        headers :{"Content-Type" : "application/json"},
        body : JSON.stringify({ids})
    })
    const data = await response.json()
    
    const formatedData = data?.products.map(product => {
        return {
            product : product,
            quantity : cartItemsObj[product._id]
        }
    });
    setCartItems(formatedData)
 } catch (error) {
    console.log(error)
 }finally{
    setCartLoading(false)
 }
}


    }
    getCart()
},[accessToken, cartRefresh, user])




async function quantityIncrease(productId, currentQuantity){
if(user){
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

} catch (error) {
    console.log(error)
}
} else{
    setCartRefresh(prev => prev + 1)
    setLocalCart((prev) =>{
          return prev.map(item => item._id === productId ? {...item, quantity : item.quantity + 1} : item)
    })
          
          
}
}

async function quantityDecrease(productId, currentQuantity){

if(user){
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

} catch (error) {
   console.log(error) 
}
}else{
    setCartRefresh(prev => prev + 1)
     setLocalCart((prev)=>{
    const product = prev.find(item => item._id === productId)
    if(product?.quantity > 1){
        return prev.map(item => item._id === productId ? {...item, quantity : item.quantity - 1} : item)
    }
    return prev.filter(item => productId !== item._id)
   })
}

}

async function clearCart(){
     if(!confirm("Do you agree to delete your cart data?")) {
        return
    }
  if(user){
     try {
   
        setCartRefresh(prev => prev + 1)
        const response = await fetchApi("http://localhost:2310/api/cart/removeCart",{
            method : "DELETE",
            headers : {
                Authorization :  `Bearer ${accessToken}`
            }
        },setAccessToken)
        const data = await response.json()
    } catch (error) {
        console.log(error)
    }
  } else{
    setCartRefresh(prev => prev + 1)
    setLocalCart([])
    setCartItems([])
  }
}
async function removeFromCart(productId){
 
if(user){
        try {
        setCartRefresh(prev => prev + 1)
        const response = await fetchApi(`http://localhost:2310/api/cart/${productId}`,{
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        },setAccessToken)
        const data = await response.json()
        
    } catch (error) {
       console.log(error) 
    }
} else{
            setCartRefresh(prev => prev + 1)
           
    setLocalCart((prev)=>{
        return prev.filter(item => item._id !== productId)
    })
    setCartItems((prev)=>{
        return prev.filter(item => item._id !== productId)
    })
    
}

 
}

useEffect(()=>{
   
      if (!user || !localCart || localCart.length === 0) return;
    async function localCartToDb() {
   try {
     const response = await fetch("http://localhost:2310/api/cart/localCartToDb",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization :  `Bearer ${accessToken}`
        },
        body : JSON.stringify({localCart})
    })
    const data = await response.json()
    if(response.ok){
        localStorage.removeItem("cart-data")
        setCartRefresh(prev => prev + 1)
    }
   } catch (error) {
    console.log(error)
   }
    }
    localCartToDb()
},[user])

// local storage

useEffect(()=>{
    if(!user){
        localStorage.setItem("cart-data", JSON.stringify(localCart))
       
    }
},[localCart])




return(
    <cartContext.Provider value={{cartItems, addToCart, quantityIncrease, quantityDecrease, clearCart, removeFromCart, cartLoading, setCartItems}}>
        {children}
    </cartContext.Provider>
)
}
export default CartProvider


