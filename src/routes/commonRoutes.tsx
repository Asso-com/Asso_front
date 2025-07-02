import NotFoundPage from "@features/NotFoundPage";

const commonRoutes = [
  {
    path: "/access-denied",
    element: <>Access denied</>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default commonRoutes;
