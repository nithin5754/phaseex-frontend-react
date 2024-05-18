import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const userInfo = useSelector((state: any) => state.auth);
  console.log(userInfo, "userInfo");

  const location = useLocation();


  
  return userInfo.token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
export default RequireAuth;
