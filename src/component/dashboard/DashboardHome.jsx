import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const DashboardHome = () => {
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
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-7">
      <div className="border border-b-4 border-orange-400 w-auto rounded-md text-lg p-4">
        <p className="">
          Name:
          <span className="text-white text-sm bg-black mx-1 px-2 pb-1 rounded-sm">
            {user?.displayName ? user?.displayName : user?.name}
          </span>
        </p>
        <p>
          Email:
          <span className="text-white text-sm bg-black mx-1 px-2 pb-1 break-words rounded-sm">
            {user?.email}
          </span>
        </p>
      </div>
      <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
        <p>My Products</p>
        <p>Total: {products?.length} </p>
      </div>
      <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
        <p>Order</p>
        <p>Total: {bookings?.length} </p>
      </div>
      <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
        <p>Payment Completed</p>
        <p>Total: {payments?.length} </p>
      </div>
    </div>
  );
};

export default DashboardHome;
