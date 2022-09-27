import { Navigate, Outlet } from "react-router-dom";

const LogoutOnlyRoute = ({ isAllowed, redirectPath = "/home", children }) => {
  if (isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default LogoutOnlyRoute;
