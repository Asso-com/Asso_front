import { createBrowserRouter } from "react-router-dom";

import { Navigate } from "react-router-dom";
import authRoutes from "./authRoutes";
import protectedRoutes from "./protectedRoutes";
import commonRoutes from "./commonRoutes";

const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  ...authRoutes,
  ...protectedRoutes,
  ...commonRoutes,
];

const AppRoutes = createBrowserRouter(routes);

export default AppRoutes;
