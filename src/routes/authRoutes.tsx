import AuthLayout from "../layouts/auth-layout/AuthLayout";
import LoginPage from "../features/auth/pages/login/LoginPage";
import ForgotPasswordPage from "@features/auth/pages/forgot-password/ForgotPasswordPage";

const authRoutes = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
];

export default authRoutes;
