import { Navigate, useLocation } from "react-router";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="mx-auto flex mt-48 justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>;
};

export default PrivateRoute;
