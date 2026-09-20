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
import Orders from './Admin/Pages/Orders';
import Users from './Admin/Pages/Users';
import Dashboard from './Admin/Pages/Dashboard';
import AddProduct from './Admin/Pages/AddProduct';
import OrderDetail from './Admin/Pages/OrderDetails';
import ProductDetail from './Admin/Pages/ProductDetail';
import UserDetail from './Admin/Pages/UserDetail';
import AdminRoutes from './Admin/Components/AdminRoutes';
import { AlertProvider } from '../Context/AlertContext';
import UserOrders from './Pages/Orders';
import UserOrderDetail from './Pages/userOrderDetails';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';


const router = createBrowserRouter([
  {path : "/", element : <Layout />, children: [
    { path : "/", element : <Home /> },
    {path : "/category/:categoryName", element : <CategoryPage />},
    {path : "/product/:id", element : <ProductDetailPage />},
    {path : "/MyCart", element : <Cart />},
    {path : "/search", element : <SearchPage />},
    {path : "/orders", element : <UserOrders />},
    {path : "/orders/:id", element : <UserOrderDetail />},

]},
  {path : "/register", element : <PublicRoute><Register /></PublicRoute> },
  {path : "/forgot-password", element : <PublicRoute><ForgotPassword /></PublicRoute> },
  {path : "/reset-password/:token", element : <PublicRoute><ResetPassword /></PublicRoute> },
  {path : "/login", element : <PublicRoute><Login /></PublicRoute>},
  {path : '/userAddress', element : <CartProtectedRoute><AddressPage /></CartProtectedRoute> },
  {path : '/payment', element : <CartProtectedRoute><PaymentPage /></CartProtectedRoute> },
  {path : '/order-success/:orderId', element : <SuccessProtection><OrderSuccess /></SuccessProtection> },
  {path : "/admin", element : <AdminRoutes><AdminLayout /></AdminRoutes>, children : [
    {path : "products", element : <Products />},
    {path : "orders", element : <Orders />},
    {path : "users", element : <Users />},
    {path : "dashboard", element : <Dashboard />},
    {path : "products/add", element : <AddProduct />},
    {path : "orders/:orderId", element : <OrderDetail />},
    {path : "products/:productId", element : <ProductDetail />},
    {path : "users/:userId", element : <UserDetail />},
  ]}

])


function App() {
  return (<AuthProvider>
    <AlertProvider>
    <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
  </AlertProvider>
  </AuthProvider>)
}

export default App;