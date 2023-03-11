import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRouter = () => {
  const { profile } = useSelector((store) => store.user);

  return profile?.email ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtectedRouter;
