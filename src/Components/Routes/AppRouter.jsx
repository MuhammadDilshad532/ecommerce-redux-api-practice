import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Home from '../Home/Home'
import VerifyOtp from '../Auth/VerifyOtp'
import ForgotPassword from '../Auth/ForgotPassword'

const AppRouter = () => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/verifyotp' element={<VerifyOtp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          currentUser ? <Home /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default AppRouter;
