import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import Swal from "sweetalert2";
import review from "../../../assets/review.jpg";
import { MdSystemUpdateAlt } from "react-icons/md";
import { useState } from "react";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // input value জন্য আলাদা state
  const [mealId, setMealId] = useState(null); // Meal ID জন্য আলাদা state

  const { data: myallReviews = [], refetch } = useQuery({
    queryKey: ["myallReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    },
  });

  // Review Delete করার ফাংশন
  const handleReviewDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleOpenModal = (id) => {
    setMealId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputValue("");
    setMealId(null);
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosSecure.patch(`/updateReview/${mealId}`, {
        review: inputValue,
      });
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "Review updated successfully.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update review. Please try again.",
        icon: "error",
      });
    }
    handleCloseModal();
  };

  console.log(myallReviews);
  return (
    <div>
      {myallReviews.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <h3 className="text-2xl mb-2 font-bold">
              My Review : ( {myallReviews.length} )
            </h3>
            <table className="table">
              <thead className="md:text-xl text-lg text-black">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {myallReviews.map((review, i) => (
                  <tr key={review._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="md:flex items-center gap-3">
                        <div className="mask avatar mask-squircle h-12 w-12">
                          <img src={review.meal_photoUrl} alt="Meal" />
                        </div>

                        <div>
                          <div className="font-bold">{review.title}</div>
                          <div className="text-sm opacity-50 flex gap-2 items-center">
                            {review.review} <AiFillLike />{" "}
                            {review?.like?.like_count}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <span className="text-2xl bg-blue-400 p-3 btn hover:text-black text-white rounded-xl">
                          <IoEye />
                        </span>

                        <span
                          onClick={() => handleOpenModal(review._id)}
                          className="text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"
                        >
                          <MdSystemUpdateAlt />
                        </span>
                        <span
                          onClick={() => handleReviewDelete(review._id)}
                          className="text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"
                        >
                          <RiDeleteBack2Fill />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Enter Your Value</h2>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                  placeholder="Type something..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full mx-auto justify-center flex md:py-40">
          <img className="md:w-[300px]" src={review} alt="" />
        </div>
      )}
    </div>
  );
};

export default AllReviews;
