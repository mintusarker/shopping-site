import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardHome = () => {
  const { user } = useContext(AuthContext);

  // booking
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/bookings`);
      const data = await res.json();
      return data;
    },
  });

  // user product
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/products`);
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data: newProduct = [] } = useQuery({
    queryKey: ["newProduct"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/new-arrival`);
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { data: topSell = [] } = useQuery({
    queryKey: ["topSell"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/top-selling`);
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
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` http://localhost:5000/users`
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
    <div className="bg-gradient-to-t from-orange-100 to-orange-200 h-screen p-10">
      <div className="flex flex-wrap justify-start gap-4">
        <div className="">
          <p className="">
            Name:
            <span className="text-white text-sm bg-black opacity-60 mx-1 px-2 pb-1 rounded-sm">
              {user?.displayName ? user?.displayName : user?.name}
            </span>
          </p>
          <p>
            Email:
            <span className="text-white text-sm bg-black opacity-60 mx-1 px-2 pb-1 break-words rounded-sm">
              {user?.email}
            </span>
          </p>
        </div>
        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Products</p>
          <p>{products?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>New Products</p>
          <p>{newProduct?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Top selling Products</p>
          <p>{topSell?.length} </p>
        </div>
        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Order</p>
          <p>{bookings?.length} </p>
        </div>
        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Payment Completed</p>
          <p>{payments?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Payment pending</p>
          <p>{0} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Users</p>
          <p>{users?.length} </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
