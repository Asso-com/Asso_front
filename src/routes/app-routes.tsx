import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthLayout from "../layouts/auth-layout/AuthLayout";
import PrivateLayout from "../layouts/private-layout/PrivateLayout";

const routes = [
  // Redirect root path to dashboard
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  // Authentication Routes
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <h2>Login</h2> }],
  },

  {
    element: <PrivateLayout />,
    children: [
      { path: "/test", element: <h2>Test</h2> },
      { path: "/dashboard", element: <h1>Dashboard</h1> },
    ],
  },
  {
    path: "/access-denied",
    element: <>Access denbied</>,
  },
  {
    path: "*",
    element: <h2>Not found Page </h2>,
  },
];

export default routes;
