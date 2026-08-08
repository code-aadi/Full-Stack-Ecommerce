import React from 'react';
import './styles/main.css'; // Global CSS yahan import karo
import Home from './Pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './Pages/CategoryPage';
import Layout from './components/Layout';
import ProductDetailPage from './Pages/ProductDetailPage';
import Cart from './Pages/Cart';
import CartProvider from '../Context/CartContext';
import Register from './Pages/Register';
import Login from './Pages/Login';



const router = createBrowserRouter([
  {path : "/", element : <Layout />, children: [
    { path : "/", element : <Home /> },
    {path : "/category/:categoryName", element : <CategoryPage />},
    {path : "/product/:id", element : <ProductDetailPage />},
    {path : "/MyCart", element : <Cart />},

]},
  {path : "/register", element : <Register />},
  {path : "/login", element :<Login />},

])


function App() {
  return <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
}

export default App;