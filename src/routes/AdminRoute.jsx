import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const {user , handleSignOut} = useAuth();
    const [isAdmin ] = useAdmin();
    const location = useLocation();
    const navigate = useNavigate()
     
    if (user && isAdmin) {
        return children;
    }

    handleSignOut()
    .then(res => {
        navigate("/login")
    })
    .catch(error => {})

    return <Navigate to='/login' state={{ from: location }} />;
};

export default AdminRoute;
