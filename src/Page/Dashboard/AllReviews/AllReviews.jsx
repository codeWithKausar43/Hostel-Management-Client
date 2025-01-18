import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import Swal from "sweetalert2";
import review from "../../../assets/review.jpg"
import { MdSystemUpdateAlt } from "react-icons/md";
const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: myallReviews = [],
     refetch
    
  } = useQuery({
    queryKey: ["myallReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    },
  });

  console.log(myallReviews);
  //   specific review delete
  const handleReviewDelete = (id) => {
    console.log(id);
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
        console.log("meals deleted", id);
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

  return (
    <div>
        
      {myallReviews.length > 0 ? (
        <div className="overflow-x-auto">
            <h3 className="text-2xl mb-2 font-bold">My Review : ( {myallReviews.length} )</h3>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>

                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myallReviews.map((review, i) => (
                <tr key={review._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={review.meal_photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
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
                    <div className="flex gap-3 ">
                      <span className=" text-2xl bg-blue-400 p-3 btn hover:text-black text-white rounded-xl">
                        <IoEye />
                      </span>

                      <span
                        onClick={() => handleReviewDelete(review._id)}
                        className=" text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"
                      >
                        <MdSystemUpdateAlt/>
                      </span>
                      <span
                        onClick={() => handleReviewDelete(review._id)}
                        className=" text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"
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
      ) : (
        <div className="w-full mx-auto justify-center flex md:py-40">
            <img className="md:w-[300px]" src={review} alt="" />
        </div>
      )}
    </div>
  );
};

export default AllReviews;
