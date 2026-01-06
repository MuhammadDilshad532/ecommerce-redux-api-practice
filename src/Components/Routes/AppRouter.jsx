import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Home from '../Common/Home'
import VerifyOtp from '../Auth/VerifyOtp'
import ForgotPassword from '../Auth/ForgotPassword'
import ResetPassword from '../Auth/ResetPassword'
import Users from '../Common/Users'
import Products from '../Common/Products'
import Cart from '../Common/Cart'
import Orders from '../Common/Orders'
import Wishlist from '../Common/Wishlist'
import Contect from '../Common/Contect'

const AppRouter = () => {
  // const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='verify-otp' element={<VerifyOtp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='wishlist' element={<Wishlist />} />
      <Route path='contect' element={<Contect />} />
      {/* <Route
        path="/"
        element={
          currentUser ? <Home /> : <Navigate to="/login" replace />
        }
      /> */}
      <Route path='/users' element={<Users />} />
    </Routes>
  );
};

export default AppRouter;
