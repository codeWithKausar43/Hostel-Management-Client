import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { data: requestMeal = [], refetch } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serveMeals");
      return res.data;
    },
  });
  console.log(requestMeal);

  const handleDeliver = (id, email) => {
    console.log(id, email);
  };
  return (
    <div>
     {
      requestMeal.length > 0 ?  <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-xl text-black">
            <th></th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requestMeal.map((meal, i) => (
            <tr key={meal._id}>
              <th>{i + 1}</th>
              <td className="text-lg">{meal.email}</td>
              <td className="text-lg black">{meal.status}</td>

              <td>
                <button
                  onClick={() => handleDeliver(meal._id, meal.email)}
                  className=" py-2 px-4 bg-gray-200 rounded-t-xl font-bold"
                >
                  Deliver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>: 
    <div className="text-4xl text-red-400 mx-auto flex justify-center items-center">No Serve Meal</div>
     }
    </div>
  );
};

export default ServeMeals;
