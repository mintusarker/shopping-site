import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const UserDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [userPayment, setUserPayment] = useState();
  // console.log(userPayment);

  const pending = userPayment?.filter((payment) => !payment?.transactionId);
  // console.log(pending);

  // booking/order
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `https://user-dashboard-server-five.vercel.app/bookings/email?email=${user?.email}`
      );
      const data = await res.json();
      setUserPayment(data);
      return data;
    },
  });

  //get payment by user email
  const { data: paymentByUser } = useQuery({
    queryKey: ["paymentByUser"],
    queryFn: async () => {
      const res = await fetch(
        `https://user-dashboard-server-five.vercel.app/payment-by-user/email?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  //for chart visualize
  const data01 = [
    { name: "Orders", value: bookings?.length },
    { name: "payment", value: paymentByUser?.length },
    { name: "Payment Pending", value: pending?.length },
    { name: "Users name", value: user?.displayName },
  ];

  return (
    <div className="bg-gradient-to-t from-orange-100 to-orange-200 h-screen p-10">
      <div className="flex flex-wrap justify-start gap-4">
        <div className="">
          <p className="">
           <span className="font-semibold">{user && "User:"}</span>
            <span className="text-white text-sm bg-black opacity-60 mx-1 px-2 pb-1 rounded-sm">
              {user?.displayName ? user?.displayName : user?.name}
            </span>
          </p>
          <p>
           <span className="font-semibold"> Email:</span>
            <span className="text-white text-sm bg-black opacity-60 mx-1 px-2 pb-1 break-words rounded-sm">
              {user?.email}
            </span>
          </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Order</p>
          <p>{bookings?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Payment Complete</p>
          <p>{paymentByUser?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p> Payment Pending</p>
          <p>{pending?.length}</p>
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

export default UserDashboardHome;
