import { Navigate, useLocation } from "react-router";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
       
        <span className="loading mx-auto mt-48 loading-bars loading-md flex  items-center justify-center "></span>
    
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>;
};

export default PrivateRoute;
