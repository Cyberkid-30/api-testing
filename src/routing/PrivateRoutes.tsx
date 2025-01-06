import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import NavBar from "../state-management/NavBar";

const PrivateRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default PrivateRoutes;
