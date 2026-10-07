import {  createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import fetchApi from "../utils/fetchApi";


export const cartContext = createContext()
function CartProvider ({children}){
    const {user} = useContext(AuthContext)
    const {accessToken, setAccessToken} = useContext(AuthContext)
    const [cartLoading, setCartLoading] = useState(false)
    const [addToCartLoading, setAddToCartLoading] = useState({})

    const [cartItems, setCartItems] = useState([]);
const [localCart, setLocalCart] = useState(() => JSON.parse(localStorage.getItem("cart-data") || '[]'));
    const [cartRefresh, setCartRefresh] = useState(0)

const cartItemsObj = {}
localCart?.forEach(item => {
  cartItemsObj[item._id] = item.quantity
});

async function addToCart(productId){
    if(user){
       
setAddToCartLoading((prev)=>(
    {...prev, [productId] : true}
))       
        try {
            
        const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/add`, {
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
          return {success : true, message : "Product is added to cart"}
        }
        
    } catch (error) {
         setAddToCartLoading((prev) => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
         })
       return {success : false, message : "Unable to add product to cart. Please check your internet"}

    }finally{
        setAddToCartLoading((prev) => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
         })
    }
    }
    else{
     
       setCartItems((prev)=>{
            const productExistInCart = prev.find(cart => cart.product._id === productId)
            if(productExistInCart){
              return prev.map(item => 
            item.product?._id === productId 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
        );
            }
            return [
        ...prev, 
        { 
            product: { _id: productId }, 
            quantity: 1 
        }
    ];
        })
        setLocalCart((prev)=>{
    const ProductExistInCart = prev.find(cart => cart._id === productId)
    if(ProductExistInCart){
     
        return prev.map(item => 
            item._id === productId ? {...item, quantity : item.quantity+1} : item
        )
    }
    return [...prev,{_id : productId, quantity : 1 }]
})
 return {success : true, message : "Product is added to cart"}
    }
    

}


useEffect(()=>{
    async function getCart(){
        setCartLoading(true)
       
if(user){
     try {
    const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/get`,{
    method : "GET",
    headers : {
        Authorization : `Bearer ${accessToken}`
    }
 }, setAccessToken)
 const data = await response.json()

setCartItems(data.cart.items)


 } catch (error) {
 }finally{
    setCartLoading(false)
 }
} 

    }
    getCart()
},[accessToken, cartRefresh, user])


useEffect(()=>{
async function getCartsOfNonUser() {
       
if(user) return
setCartLoading(true)
    const ids = localCart?.map((cart) => cart._id)

   if(!ids|| ids.length === 0){
  setCartItems([])
  setCartLoading(false)
    return
   }
 try {
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/localCart`,{
        method : "POST",
        headers :{"Content-Type" : "application/json"},
        body : JSON.stringify({ids})
    })
    const data = await response.json()
    
    const formatedData = data?.products.map(product => {
        return {
            product : product,
            quantity : cartItemsObj[product._id] || 1
        }
    });
    setCartItems(formatedData)
 } catch (error) {
 }finally{
    setCartLoading(false)
 }
}
getCartsOfNonUser()
},[localCart])



async function quantityIncrease(productId, currentQuantity){
 
if(user){
   
    const newQuantity = currentQuantity + 1
setAddToCartLoading((prev)=>(
    {...prev, [productId] : true}
)) 
 setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
try {
const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/quantity`, {
    method : "PATCH",
    headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({newQuantity : newQuantity, productId : productId})
}, setAccessToken)
if(!response.ok){
    setCartRefresh(prev => prev + 1)
}
 const data = await response.json()

} catch (error) {
        setCartRefresh(prev => prev + 1)

    return {success : false, message : "Unable to increase quantity. Please check your internet"}
}finally{
    setAddToCartLoading({})
}
} else{
       
setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setLocalCart((prev) =>{
          return prev.map(item => item._id === productId ? {...item, quantity : item.quantity + 1} : item)
    })
          
          
}
}

async function quantityDecrease(productId, currentQuantity){

if(user){
   
const currentItem = cartItems.find(item => item.product._id === productId)

if(!currentItem) return
setAddToCartLoading((prev)=>(
    {...prev, [productId] : true}
)) 
if(currentItem.quantity === 1){
          setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
await removeFromCart(productId)
return
}
 const newQuantity = currentQuantity - 1
 setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
try {
    const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/quantity`, {
    method : "PATCH",
    headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({newQuantity : newQuantity, productId : productId})
},setAccessToken)
if(!response.ok){
    setCartRefresh(prev => prev + 1)
}
const data = await response.json()

} catch (error) {
    return {success : false, message : "Unable to decrease quantity. Please check your internet"}
}finally{
    setAddToCartLoading({})
}
}else{
    const currentItem = cartItems.find(item => item.product._id === productId)

if(!currentItem) return
    

if(currentItem.quantity === 1){
          setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
await removeFromCart(productId)
return
}
 const newQuantity = currentQuantity - 1
 setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
   
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
   setCartItems([])
      
        const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/removeCart`,{
            method : "DELETE",
            headers : {
                Authorization :  `Bearer ${accessToken}`
            }
        },setAccessToken)
        const data = await response.json()
        if(!response.ok){
              setCartRefresh(prev => prev + 1)
        }
    } catch (error) {
    return {success : false, message : "Unable to clear the cart. Please check your internet"}
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
        
       setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
        const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${productId}`,{
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        },setAccessToken)
        const data = await response.json()
        if(!response.ok){
            setCartRefresh(prev => prev + 1)
        }
        return data
    } catch (error) {
          return {success : false, message : "Unable to remove product from cart. Please check your internet"}

    }finally{
        setAddToCartLoading({})
    }
} else{
           
           
    setLocalCart((prev)=>{
        return prev.filter(item => item._id !== productId)
    })
    setCartItems((prev)=>{
        return prev.filter(item => item.product._id !== productId)
    })
    
}

 
}

useEffect(()=>{
   
      if (!user || !localCart || localCart.length === 0) return;
    async function localCartToDb() {
   try {
     const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/cart/localCartToDb`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization :  `Bearer ${accessToken}`
        },
        body : JSON.stringify({localCart})
    },setAccessToken)
    const data = await response.json()
    if(response.ok){
        localStorage.removeItem("cart-data")
        setCartRefresh(prev => prev + 1)
    }
   } catch (error) {
    
   }
    }
    localCartToDb()
},[user, accessToken])

// local storage

useEffect(()=>{
    if(!user){
        localStorage.setItem("cart-data", JSON.stringify(localCart))
       
    }
},[localCart])




return(
    <cartContext.Provider value={{cartItems,addToCartLoading, addToCart, quantityIncrease, quantityDecrease, clearCart, removeFromCart, cartLoading, setCartItems}}>
        {children}
    </cartContext.Provider>
)
}
export default CartProvider


