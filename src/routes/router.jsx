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
import Meals from "../components/Meals";
import AddMeal from "../Page/Dashboard/AddMeal/AddMeal";
import AllMeals from "../Page/Dashboard/AllMeals/AllMeals";
import UPdateMeal from "../Page/Dashboard/UpdateMeal/UPdateMeal";
import UpcomingMeals from "../Page/UpcomingMeals";
import { GiMeal } from "react-icons/gi";
import MealDetails from "../Page/MealDetails";
import AllReview from "../Page/Dashboard/AllReview/AllReview";
import Membership from "../Page/Membership";
import AddMembershipCard from "../Page/Dashboard/Membership/AddMembershipCard";
import UpdateMembershipCard from "../Page/Dashboard/Membership/UpdateMembershipCard";
import MembershipCard from "../Page/Dashboard/Membership/MembershipCard";
import Checkout from "../Page/Checkout";
import PaymentsHistory from "../Page/Dashboard/Payment/PaymentsHistory";
import AllReviews from "../Page/Dashboard/AllReviews/AllReviews";
import MyRequest from "../Page/RequestPage/MyRequest";
import AllRequest from "../Page/Dashboard/AllRequest/AllRequest";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ServeMeals from "../Page/Dashboard/ServeMeals/ServeMeals";
import AdminUpcomingMeals from "../Page/Dashboard/AdminUpcomingMeals/AdminUpcomingMeals";
 

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
        path: "/upcomingMeals",
        element:<UpcomingMeals></UpcomingMeals>
      },
      {
        path:"/meal/:id",
        element:<PrivateRoute><MealDetails></MealDetails></PrivateRoute>
      },
      {
        path:"/checkout/:id",
        element:<Checkout></Checkout>
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
        path:"/dashboard/serveMeals",
        element:<PrivateRoute><AdminRoute><ServeMeals></ServeMeals></AdminRoute></PrivateRoute>
      },
      {
        path:"/dashboard/paymentsHistory",
        element:<PaymentsHistory></PaymentsHistory>
      },
      {
        path:"/dashboard/manageUsers",
        element:<AllUser></AllUser>
      },
      {
        path:"/dashboard/addMeal",
        element:<AddMeal></AddMeal>
      },
      {
        path:"/dashboard/allMeals",
        element:<AllMeals></AllMeals>
      },
      {
        path:"/dashboard/updateMeal/:id",
        element:<UPdateMeal></UPdateMeal>
      },
      {
        path:"/dashboard/allReview",
        element:<AllReview></AllReview>
      },
      {
        path:"/dashboard/allRequest",
        element:<AllRequest></AllRequest>
      },
      {
        path:"/dashboard/requestedMeals",
        element:<MyRequest></MyRequest>
      },
      {
        path:"/dashboard/userAllReview",
        element:<AllReviews></AllReviews>
      },
      {
        path:"/dashboard/addMembership",
        element:<AddMembershipCard></AddMembershipCard>
      },
      {
        path:"/dashboard/membershipCard",
        element:<MembershipCard></MembershipCard>
      },
      {
        path:"/dashboard/membershipCardUpdate/:id",
        element:<PrivateRoute><AdminRoute><UpdateMembershipCard></UpdateMembershipCard></AdminRoute></PrivateRoute>
      },
      {
        path:"/dashboard/upcomingMeals",
        element:<PrivateRoute><AdminRoute><AdminUpcomingMeals></AdminUpcomingMeals></AdminRoute></PrivateRoute>
      },
       
    ]
  }
]);

export default router;
