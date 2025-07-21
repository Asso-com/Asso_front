import AuthPage from "@features/auth/AuthPage";
import AuthLayout from "../layouts/auth-layout/AuthLayout";

const authRoutes = [
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <AuthPage /> }],
  },
];

export default authRoutes;
