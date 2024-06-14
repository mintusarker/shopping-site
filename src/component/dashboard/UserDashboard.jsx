import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  // booking
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // user product
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` http://localhost:5000/product?email=${user?.email}`
        );
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` http://localhost:5000/paymentDone?email=${user?.email}`
        );
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-10">
      <div className="border border-b-4 border-orange-400 text-center rounded-md p-6 text-2xl bg">
        <p>My Products</p>
        <p>Total: {products?.length} </p>
      </div>
      <div className="border border-b-4 border-orange-400 text-center rounded-md p-6 text-2xl bg">
        <p>Order</p>
        <p>Total: {bookings?.length} </p>
      </div>
      <div className="border border-b-4 border-orange-400 text-center rounded-md p-6 text-2xl bg">
        <p>Payment Completed</p>
        <p>Total: {payments?.length} </p>
      </div>
    </div>
  );
};

export default UserDashboard;