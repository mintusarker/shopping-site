import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [pendingPayment, setPendingPayment] = useState();

  const [paymentCount, setPaymentCount] = useState();
  console.log(paymentCount);

  //total payment calculate
  const payment = paymentCount?.map((pay) => pay.price);
  console.log(payment);
  let sum = 0;
  for (let i = 0; i < payment?.length; i++) {
    sum += parseInt(payment[i]);
  }
  // console.log(sum);

  //pending payment
  const pending = pendingPayment?.filter((pen) => !pen?.transactionId);

  // booking
  const { data: all_bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `user-dashboard-server-five.vercel.app/all_bookings`
      );
      const data = await res.json();
      setPendingPayment(data);
      // console.log(data);
      return data;
    },
  });

  // user product
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` user-dashboard-server-five.vercel.app/products`
        );
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
        const res = await fetch(
          ` user-dashboard-server-five.vercel.app/new-arrival`
        );
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
        const res = await fetch(
          ` user-dashboard-server-five.vercel.app/top-selling`
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
          ` user-dashboard-server-five.vercel.app/payment`
        );
        const data = await res.json();
        setPaymentCount(data);
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
        const res = await fetch(` user-dashboard-server-five.vercel.app/users`);
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const data01 = [
    { name: "Products", value: products?.length },
    { name: "Top Selling", value: topSell?.length },
    { name: "New Arrival", value: newProduct?.length },
    { name: "Orders", value: all_bookings?.length },
    { name: "payment", value: payments?.length },
    { name: "Payment Pending", value: pending?.length },
    { name: "Users", value: users?.length },
  ];

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
          <p>{all_bookings?.length} </p>
        </div>
        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Payment Completed</p>
          <p>{payments?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Payment pending</p>
          <p>{pending?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Total Sell</p>
          <p className="text-green-500 font-semibold">{sum} $ </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Users</p>
          <p>{users?.length} </p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        className="w-full mx-auto -mt-[150px]"
      >
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboardHome;
