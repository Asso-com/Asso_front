// routes/protectedRoutes.tsx
import ProtectedLayout from "../layouts/private-layout";
import DashboardPage from "../features/dashboard/DashoardPage";
import SchoolYearSettingsContainer from "@features/system-settings/school-year-settings/SchoolYearSettingsContainer";

const protectedRoutes = [
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/Settings/SessionSetting", element: <SchoolYearSettingsContainer /> },
    ],
  },
];

export default protectedRoutes;
