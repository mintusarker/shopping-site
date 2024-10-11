import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const UserDashboardHome = () => {
  const { user } = useContext(AuthContext);

  // booking
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings/email?email=${user?.email}`
      );
      const data = await res.json();
      return data;
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
          <p>Order</p>
          <p>{bookings?.length} </p>
        </div>

        <div className="border border-b-4 border-orange-400 text-center rounded-md text-lg p-4">
          <p>Payment pending</p>
          <p>{0} </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
