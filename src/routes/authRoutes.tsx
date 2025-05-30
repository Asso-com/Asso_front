import AuthLayout from "../layouts/auth-layout/AuthLayout";
import LoginPage from "../features/auth/pages/login/LoginPage";

const authRoutes = [
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
];

export default authRoutes;
