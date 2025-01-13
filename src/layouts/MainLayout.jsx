import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
 

 

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[330px]">
            <Outlet></Outlet>
            </div>
      
        </div>
    );
};

export default MainLayout;