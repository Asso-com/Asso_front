import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";

const AuthLayout = () => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isUserLoggedIn
  );

  if (isUserLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
