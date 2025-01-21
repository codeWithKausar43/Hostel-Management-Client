import React, { useState } from "react";

import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminUpcomingMeals = () => {
  const [sortBy, setSortBy] = useState("title");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mealId, setMealId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: upcomingMeals = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["meals", sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?sortBy=${sortBy}`);
      return res.data;
    },
  });

  const Upcoming = upcomingMeals.filter((item) => item.category === "Upcoming");
  if (isLoading) {
    return (
      <span className="loading loading-bars loading-md flex mx-auto items-center md:mt-60"></span>
    );
  }

  // modal
  const toggleModal = (id) => {
    setMealId(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Selected Category:", selectedCategory, "Meal ID:", mealId);
    const publishInfo = {
      selectedCategory,
      mealId,
    };
    const response = await axiosSecure.patch(`/publishMeal`, publishInfo);
    if (response.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Publish Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      {Upcoming.length > 0 ? (
        <div>
          <div className="flex justify-between items-center ">
            <div className="text-2xl font-bold">
              Upcoming Meals : ( {Upcoming.length} )
            </div>
            <div className="flex justify-between mb-4">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
                className="p-2 border border-y-2 border-gray-300 rounded-md"
              >
                <option value="title">Meal Sort</option>
                <option value="like">Sort by Likes</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="text-xl text-black">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Add Upcoming</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Upcoming.map((meal, i) => (
                  <tr key={meal._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={meal.photoUrl} alt="Meal" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{meal.title}</div>
                          <div className="text-sm opacity-50 flex gap-2 items-center">
                            <AiFillLike /> {meal?.like?.like_count}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-md">
                        {meal.name}
                      </span>
                    </td>

                    <td>
                      <Link to={`/dashboard/addMeal`}>
                        <span className=" hover:text-black font-bold bg-blue-400 p-3 text-white rounded-md">
                          Add Meal
                        </span>
                      </Link>
                    </td>
                    <td>
                      <span
                        onClick={() => toggleModal(meal._id)}
                        className=" hover:text-black font-bold cursor-pointer bg-blue-400 p-3 text-white rounded-md"
                      >
                        Publish
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* modal start*/}
          <div>
            {isModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-80">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="mt-2 p-2 w-full border border-gray-300 rounded"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* modal end */}
        </div>
      ) : (
        <p className="text-4xl font-bold text-center">Not Available</p>
      )}
    </div>
  );
};

export default AdminUpcomingMeals;
