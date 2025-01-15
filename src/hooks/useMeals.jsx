import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

 

const useMeals = () => {
    const axiosSecure = useAxiosSecure()
    const {data: meals = [], isPending: loading, refetch } = useQuery({
        queryKey:["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals')
            return res.data
        }
    })
    return [meals, loading, refetch]
};

export default useMeals;