import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AiTwotoneLike } from "react-icons/ai";
import { IoIosEye } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";

const AllRequest = () => {
  
  const axiosSecure = useAxiosSecure();
  const { data: requestMeal = [], refetch } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requestMealAdmin");
      return res.data;
    },
  });

  // status updata
  const handleStatusUpdate = (id, email) => {
    const requestInfo = {
      email: email,
      requestMeal_id: id,
    };
    console.log(id);
    axiosSecure
      .patch("/requestStatusUpdate", requestInfo)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        alert("Failed to update status.");
      });
  };

  return (
    <div>
      {
       requestMeal.length > 0 ?<div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Request</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {requestMeal.map((meal) => (
              <tr key={meal._id}>
                <th></th>
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
                      <div className="text-sm opacity-50 flex gap-2">
                        <p className="flex gap-1 items-center">
                          <AiTwotoneLike /> {meal.like}
                        </p>
                        <p className="flex gap-1 items-center">
                          <IoIosEye />
                          {meal.review}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {meal.status === "pending" ? (
                    <button
                      className="bg-yellow-300 px-3 py-1 rounded-lg hover:bg-yellow-400"
                      onClick={() =>
                        handleStatusUpdate(meal.requestMeal_id, meal.email)
                      }
                    >
                      Approve
                    </button>
                  ) : (
                    <button className="bg-green-300 px-3 py-1 rounded-lg cursor-not-allowed">
                      Approved
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>: <div className="text-4xl text-red-400 flex justify-center items-center w-full">No Request</div>
      }
    </div>
  );
};

export default AllRequest;
