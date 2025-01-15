import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { Rating } from "@smastrom/react-rating";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const axiosSecure = useAxiosSecure();
  const fetchMeals = async (sortCriteria) => {
    try {
      const response = await axiosSecure.get(`/meals?sortBy=${sortCriteria}`);
      setMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals", error);
    }
  };

  useEffect(() => {
    fetchMeals(sortBy);
  }, [sortBy]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        {/* Sorting Dropdown */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="title">Sort by title</option>
          <option value="like">Sort by Likes</option>
          <option value="review">Sort by Review</option>
        </select>
      </div>
      <h3>Meals Count: {meals.length}</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Name</th>
                <th>Operation</th>
                
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {meals.map((meal, i) => (
                <tr key={meal._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={meal.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{meal.title}</div>
                        <div className="text-sm opacity-50 flex gap-2 items-center">
                          {" "}
                          <AiFillLike /> {meal.like} <IoEye /> {meal.review}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="flex flex-col justify-center">
                    <Rating style={{ maxWidth: 100 }} value={2} readOnly />
                    <span className="badge badge-ghost badge-md">
                      {meal.name}
                    </span>
                  </td>
                  
                  <td>
                <div className="flex gap-3 ">  
                <span className=" text-2xl bg-blue-400 p-3 btn hover:text-black text-white rounded-xl"><IoEye /></span>
                <span className=" text-2xl hover:text-green-700 bg-blue-400 p-3 btn text-white rounded-xl"><GrDocumentUpdate /></span>
                <span className=" text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"><RiDeleteBack2Fill /></span>
                </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
