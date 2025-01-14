import { Navigate, useLocation} from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

 

const AdminRoute = () => {
 
    const [user, loading] = useAuth()
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation()
    if(loading){
        return <span className="loading loading-ball loading-lg"></span>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{from: location}}></Navigate>
};

export default AdminRoute;