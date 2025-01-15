import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../Page/ErrorPage";
import Login from "../Page/Login";
import Register from "../Page/Resister";
import Home from "../Page/Home";
import Dashboard from "../layouts/Dashboard";
import UserProfile from "../Page/UserProfile";
import UpdateProfile from "../Page/UpdateProfile";
import { Profiler } from "react";
import AllUser from "../Page/Dashboard/AllUser/AllUser";
import AddMeal from "../Page/Dashboard/AddMeal/Addmeal";
import Meals from "../components/Meals";
 

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
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
       {
        path:"/resister", 
        element: <Register></Register>
       },
       {
        path:"/updateProfile",
        element:<UpdateProfile></UpdateProfile>
       },
       {
        path: "/profile",
        element: <Profiler />, 
      },
      
        
    ],
  },
  {
    path:"dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:"/dashboard/adminProfile",
        element:<UserProfile></UserProfile>
      },
      {
        path:"/dashboard/manageUsers",
        element:<AllUser></AllUser>
      },
      {
        path:"/dashboard/addMeal",
        element:<AddMeal></AddMeal>
      }
    ]
  }
]);

export default router;
