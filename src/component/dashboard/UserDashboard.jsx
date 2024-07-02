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
    queryKey: ["payments"],
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
    <div className="px-16">
      <div className="my-12 border border-b-4 border-orange-400 w-auto rounded-md p-6 text-xl  ">
        <p className="my-3">
          Your Name:{" "}
          <span className="text-white bg-slate-500 px-2 rounded-md">
            {user?.displayName ? user?.displayName : user?.name}
          </span>
        </p>
        <p>
          Your Email:{" "}
          <span className="text-white bg-slate-500 px-2 rounded-md">
            {user?.email}
          </span>
        </p>
      </div>
      <div className="grid lg:grid-cols-3 my-16 md:grid-cols-3 grid-cols-1 gap-10">
        <div className="border border-b-4 border-orange-400 text-center rounded-md p-6 text-2xl">
          <p>My Products</p>
          <p>Total: {products?.length} </p>
        </div>
        <div className="border border-b-4 border-orange-400 text-center rounded-md p-6 text-2xl">
          <p>Order</p>
          <p>Total: {bookings?.length} </p>
        </div>
        <div className="border border-b-4 border-orange-400 text-center rounded-md p-6 text-2xl">
          <p>Payment Completed</p>
          <p>Total: {payments?.length} </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
