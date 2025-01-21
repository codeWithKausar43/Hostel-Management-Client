import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: requestMeal = [], refetch } = useQuery({
    queryKey: ["request", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/serveMeals?search=${searchTerm}`);
      return res.data;
    },
  });
  console.log(requestMeal);

  const handleDeliver = async (id, email) => {
    console.log(id, email);
    const deliverInfo = {
      id,
      email,
    };
    const response = await axiosSecure.patch("/deliverSuccess", deliverInfo);
    if (response.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delivery successful",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    refetch(); // Refetch the data with the new search term
  };
  return (
    <div className="md:w-[90%] mx-auto w-full md:mt-12">
      <div className="flex  gap-4 justify-between items-center ">
        <div className="md:text-2xl text-md font-bold">
          <h3> Serve Meals : ({requestMeal.length}) </h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md border border-gray-300 rounded-lg py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
          />
        </div>
      </div>
      {requestMeal.length > 0 ? (
        <div className="overflow-x-auto gap-0">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="md:text-xl text-lg text-black">
                <th className="hidden md:flex"></th>
                <th>Username</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestMeal.map((meal, i) => (
                <tr key={meal._id}>
                  <th className="hidden md:flex">{i + 1}</th>
                  <td>
                    <p className="text-lg">{meal.username}</p>
                    <p className="text-md">{meal.email}</p>
                  </td>
                  {meal.status === "Delivered" ? (
                    <td className="md:text-lg text-md black text-green-500">
                      {meal.status}
                    </td>
                  ) : (
                    <td className="md:text-lg text-md black">{meal.status}</td>
                  )}

                  <td>
                    {meal.status === "Delivered" ? (
                      <button className=" md:py-2 md:px-4 px-2 py-1 bg-green-200 cursor-not-allowed rounded-t-xl font-bold">
                        Success
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeliver(meal._id, meal.email)}
                        className="md:py-2 md:px-4 px-2 py-1 bg-blue-500 text-white rounded-t-xl font-bold transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-400 hover:scale-105 active:bg-blue-700 active:shadow-blue-500 active:scale-95"
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-4xl text-black font-bold mx-auto flex justify-center items-center">
          No Serve Meal
        </div>
      )}
    </div>
  );
};

export default ServeMeals;
