import { createContext, useEffect, useState } from "react"
import fetchApi from "../utils/fetchApi";


export const AuthContext = createContext()

 function AuthProvider ({children}){
  
const [user, setUser] = useState(null)
const [userLoading, setUserLoading] = useState(true)
const [loginLoading, setLoginLoading] = useState(false);
const [accessToken , setAccessToken] = useState(null)
const [registerLoading, setRegisterLoading] = useState(false);
// --------------------register ------------------------------------
async function userRegister(userData) {

    setRegisterLoading(true)
   try {
const response = await fetch("http://localhost:2310/api/auth/register",{
  method : "POST",
  headers : {"Content-Type" : "application/json"},
  credentials : "include",
  body : JSON.stringify(userData)
})
const data = await response.json()
if(data.success){
  setUser(data.user)
  setAccessToken(data.accessToken)
}

return data
} catch (error) {
  setUser(null)
    console.log(error)
  return { success: false, message: "Network error. Please try again." };
}finally{
  setRegisterLoading(false)
}
}
useEffect(()=>{
  console.log(user)
  
},[user])

useEffect(()=>{
  console.log(accessToken)
},[accessToken])
// ----------------login-----------------------------------

async function userLogin(userData) {
  setLoginLoading(true)

try {
    const response = await fetch("http://localhost:2310/api/auth/login",{
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(userData),
    credentials : "include"
  })
  const data = await response.json()
  if(data.success){

    setUser(data.user)
      setAccessToken(data.accessToken)

  }
  return data
 
} catch (error) {
  setUser(null)
  console.log(error)
}finally{
  setLoginLoading(false)
}
}

useEffect(() => {
  async function initilizeAuth() {
    
  try {
      const response = await fetch("http://localhost:2310/api/auth/refresh",{
      method : "POST",
      credentials : "include"
    })
    const data = await response.json()
    console.log(data)
    if(!response.ok){
      setAccessToken(null)
      setUser(null)
      return
    }
    
    setAccessToken(data.accessToken)
    await getCurrentUser(data.accessToken)
  } catch (error) {
    setUser(null)
    setAccessToken(null)
    setUser(null)
    console.log(error)
  }finally{
    setUserLoading(false)
  }
  }
    initilizeAuth()
    console.log("useEffect")
}, []);

async function getCurrentUser(token) {
try {
    const response = await fetchApi("http://localhost:2310/api/auth/me",{
    headers : {
      Authorization : `Bearer ${token}`
    },
  },
  setAccessToken
)
  const data = await response.json()
if(data.success){
   setUser(data.user)
}
 else{
  setUser(null)
 }
} catch (error) {
  setUser(null)
  console.log(error)
}
 
}
// ----------- logout ---------------


async function logout() {
  try {
    const response = await fetch("http://localhost:2310/api/auth/logout",{
      method : "POST",
      credentials : "include"
    })
    const data = await response.json()
    if(data.success){
      setUser(null)
      setAccessToken(null)
    }
    alert("You Logged Out Sucessfully")
  } catch (error) {
    console.log(error)
  }
}
return(
    <AuthContext.Provider value={{userRegister, user, loginLoading, registerLoading, userLogin, logout, userLoading}} >
        {children}
    </AuthContext.Provider>
)
}

export default AuthProvider