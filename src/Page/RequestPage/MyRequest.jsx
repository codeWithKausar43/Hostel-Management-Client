import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { AiFillLike } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import noRequest from "../../assets/norequest.png"
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const MyRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: requestMeals = [], refetch } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestMeal/${user?.email}`);
      return res.data;
    },
  });

  // request delete
  const handleRequestDelete = (id) => {
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
        axiosSecure.delete(`/requestDeleteBId/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      {requestMeals.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <h3 className="text-2xl mb-2 font-bold">
              My Review : ( {requestMeals.length} )
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {requestMeals.map((requestMeal, i) => (
                  <tr key={requestMeal._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={requestMeal.photoUrl} alt="Meal" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{requestMeal.title}</div>
                          <div className="text-sm opacity-50 flex gap-2 items-center">
                            <IoEye /> {requestMeal.review}
                            <AiFillLike />
                            {requestMeal?.like}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3">{requestMeal.status}</div>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        {requestMeal.status === "approved" ? (
                          <span
                             
                            className="text-2xl cursor-not-allowed  p-3 btn hover:text-red-700 text-white rounded-xl"
                          >
                            <RiDeleteBack2Fill />
                          </span>
                        ) : (
                          <span
                            onClick={() => handleRequestDelete(requestMeal._id)}
                            className="text-2xl bg-blue-400 p-3 btn hover:text-red-700 text-white rounded-xl"
                          >
                            <RiDeleteBack2Fill />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto justify-center flex md:py-40">
          <img className="md:w-[300px]" src={noRequest} alt="" />
        </div>
      )}
    </div>
  );
};

export default MyRequest;
