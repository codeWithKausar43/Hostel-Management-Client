// import React from "react";
// import {
//   FaCalendarAlt,
//   FaCcAmazonPay,
//   FaEnvelope,
//   FaSearch,
// } from "react-icons/fa";
// import { GrUserAdmin } from "react-icons/gr";
// import { ImProfile } from "react-icons/im";
// import {
//   MdFastfood,
//   MdHome,
//   MdManageAccounts,
//   MdNoMeals,
//   MdOutlineCardMembership,
//   MdOutlineRateReview,
//   MdRateReview,
//   MdRestaurantMenu,
// } from "react-icons/md";
// import { RiGitPullRequestFill, RiMapPinAddFill } from "react-icons/ri";
// import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";

// const Dashboard = () => {
//   const [isAdmin, isAdminLoading] = useAdmin();

//   if (isAdminLoading) {
//     return (
//       <span className="loading loading-bars loading-md flex mx-auto items-center md:mt-60"></span>
//     );
//   }

//   return (
//     <div className="flex mx-auto md:w-[70%]">
//       {/*  dashboard side bar*/}
//       <div className=" w-64 min-h-screen bg-blue-300">
//         <ul className="menu px-4">
//           {isAdmin ? (
//             <div className="my-12">
//               <li>
//                 <NavLink to="/dashboard/adminProfile" className="mb-2">
//                   <GrUserAdmin /> Admin Profile
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/manageUsers" className="mb-2">
//                   <MdManageAccounts /> Manage Users
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/addMeal" className="mb-2">
//                   <RiMapPinAddFill /> Add Meal
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/allMeals" className="mb-2">
//                   <MdFastfood /> All Meals
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/allReview" className="mb-2">
//                   <MdRateReview /> All Reviews
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/allRequest" className="mb-2">
//                 <RiGitPullRequestFill /> All Request
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/serveMeals" className="mb-2">
//                   <MdRestaurantMenu /> Serve Meals
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/upcomingMeals" className="mb-2">
//                   <FaCalendarAlt />
//                   Upcoming Meals
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/addMembership" className="mb-2">
//                   <MdOutlineCardMembership />
//                   Add Membership
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/membershipCard" className="mb-2">
//                   <FaCalendarAlt />
//                   Membership Card
//                 </NavLink>
//               </li>

//               <div className="divider"></div>
//             </div>
//           ) : (
//             <div className="my-12 text-md">
//               <li>
//                 <NavLink to="/dashboard/adminProfile" className="mb-2">
//                   <GrUserAdmin />
//                   My Profile
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/requestedMeals" className="mb-2">
//                   <MdNoMeals /> Requested Meals
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/userAllReview" className="mb-2">
//                   <MdOutlineRateReview /> My Reviews
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/paymentsHistory" className="mb-2">
//                   <FaCcAmazonPay />
//                   Payment History
//                 </NavLink>
//               </li>
//               <div className="divider"></div>
//             </div>
//           )}
//           {/* sheared component */}

//           <li className="-mt-12">
//             <NavLink to="/">
//               <MdHome></MdHome> Home
//             </NavLink>
//           </li>

//         </ul>
//       </div>
//       {/*  dashboard content*/}
//       <div className="w-full mt-16 ml-12">
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { FaBars, FaCalendarAlt, FaCcAmazonPay, FaHome } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import {
  MdFastfood,
  MdManageAccounts,
  MdNoMeals,
  MdOutlineCardMembership,
  MdOutlineRateReview,
  MdRateReview,
  MdRestaurantMenu,
} from "react-icons/md";
import { RiGitPullRequestFill, RiMapPinAddFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu

  if (isAdminLoading) {
    return (
      <span className="loading loading-bars loading-md flex mx-auto items-center mt-60"></span>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Hamburger Menu for mobile */}
      <div className="md:hidden bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 min-h-screen bg-blue-300 z-50 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <ul className="menu px-4 pt-8">
          {isAdmin ? (
            <div className="my-12">
              <li>
                <NavLink to="/dashboard/adminProfile" className="mb-2">
                  <GrUserAdmin /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers" className="mb-2">
                  <MdManageAccounts /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addMeal" className="mb-2">
                  <RiMapPinAddFill /> Add Meal
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allMeals" className="mb-2">
                  <MdFastfood /> All Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allReview" className="mb-2">
                  <MdRateReview /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allRequest" className="mb-2">
                  <RiGitPullRequestFill /> All Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/serveMeals" className="mb-2">
                  <MdRestaurantMenu /> Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcomingMeals" className="mb-2">
                  <FaCalendarAlt /> Upcoming Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addMembership" className="mb-2">
                  <MdOutlineCardMembership /> Add Membership
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/membershipCard" className="mb-2">
                  <FaCalendarAlt />
                  Membership Card
                </NavLink>
              </li>
              <div className="divider"></div>
            </div>
          ) : (
            <div className="my-12">
              <li>
                <NavLink to="/dashboard/adminProfile" className="mb-2">
                  <GrUserAdmin /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedMeals" className="mb-2">
                  <MdNoMeals /> Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userAllReview" className="mb-2">
                  <MdOutlineRateReview /> My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentsHistory" className="mb-2">
                  <FaCcAmazonPay /> Payment History
                </NavLink>
              </li>
              <div className="divider"></div>
            </div>
          )}

          {/* Shared Links */}
          <li className="-mt-16">
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="w-full p-4 md:p-8 mt-16 md:mt-0"
        onClick={() => setIsMenuOpen(false)} // Close menu when clicking on content
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
