import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../Page/ErrorPage";
import Login from "../Page/Login";
import Register from "../Page/Resister";
import Home from "../Page/Home";
import Dashboard from "../layouts/Dashboard";
import UserProfile from "../Page/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
       {
        path:"/resister", 
        element: <Register></Register>
       }
        
    ],
  },
  {
    path:"dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:"/dashboard",
        element:<UserProfile></UserProfile>
      }
    ]
  }
]);

export default router;
