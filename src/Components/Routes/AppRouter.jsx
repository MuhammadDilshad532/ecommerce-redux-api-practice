import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Home from '../Home/Home'

const AppRouter = () => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

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
