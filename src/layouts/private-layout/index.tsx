import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import useAccessGuard from "../../hooks/useAccessGuard";

function ProtectedLayout() {
  const acessGuard = useAccessGuard();

  if (acessGuard) {
    return acessGuard;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default ProtectedLayout;
