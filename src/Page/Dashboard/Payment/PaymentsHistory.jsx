import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: paymentHistory = [], refetch } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  
  return (
    <div className="mt-12 md:w-[90%] w-full mx-auto">
      <h2 className="md:text-xl text-lg text-black font-bold">My Payment History</h2>
      
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
            <th>#</th>
              <th>Amount</th>
              <th className="hidden md:flex">transactionId</th>
              <th>Date</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {paymentHistory.map((history,i) => (
              <tr>
                <td>
                   {i+1}
                </td>
                <td>
                  <div className="font-bold">
                    <p>${history.price}</p>
                  </div>
                </td>
                <td className=" hidden md:flex">
                  <span className="badge badge-ghost badge-sm">
                    {history.transactionId}
                  </span>
                </td>
                <td><p>{new Date(history.date).toLocaleDateString()}</p></td>
                <th>
                  <button className="btn btn-ghost btn-xs"> {history.badge}</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsHistory;
