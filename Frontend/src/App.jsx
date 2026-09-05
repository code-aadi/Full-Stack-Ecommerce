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
import AuthProvider from '../Context/AuthContext';
import PublicRoute from './components/PublicRoute';
import SearchPage from './Pages/SearchPage';
import AddressPage from './Pages/AddressPage';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentPage from './Pages/PaymentPage';
import OrderSuccess from './Pages/OrderSuccess';
import CartProtectedRoute from './components/CartProtectedRoute';
import SuccessProtection from './components/SuccessProtection';
import AdminLayout from './Admin/Layout/AdminLayout';
import Products from './Admin/Pages/Products';
import AdminCategories from './Admin/Pages/AdminCategories';
import Orders from './Admin/Pages/Orders';
import Users from './Admin/Pages/Users';
import Dashboard from './Admin/Pages/Dashboard';



const router = createBrowserRouter([
  {path : "/", element : <Layout />, children: [
    { path : "/", element : <Home /> },
    {path : "/category/:categoryName", element : <CategoryPage />},
    {path : "/product/:id", element : <ProductDetailPage />},
    {path : "/MyCart", element : <Cart />},
    {path : "/search", element : <SearchPage />},

]},
  {path : "/register", element : <PublicRoute><Register /></PublicRoute> },
  {path : "/login", element : <PublicRoute><Login /></PublicRoute>},
  {path : '/userAddress', element : <CartProtectedRoute><AddressPage /></CartProtectedRoute> },
  {path : '/payment', element : <CartProtectedRoute><PaymentPage /></CartProtectedRoute> },
  {path : '/order-success/:orderId', element : <SuccessProtection><OrderSuccess /></SuccessProtection> },
  {path : "/admin", element : <AdminLayout />, children : [
    {path : "products", element : <Products />},
    {path : "categories", element : <AdminCategories />},
    {path : "orders", element : <Orders />},
    {path : "users", element : <Users />},
    {path : "dashboard", element : <Dashboard />}
  ]}

])


function App() {
  return (<AuthProvider>
    <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
  </AuthProvider>)
}

export default App;