import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  
  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings/email?email=${user?.email}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const handleRemove = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Booking deleted");
        refetch();
      });
  };

  return (
    <div>
      <h2 className="text-2xl my-8 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">
        My Orders: {bookings?.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-blue-600 font-bold">
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>quantity</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length &&
              bookings?.map((booking, i) => (
                <tr key={booking?._id}>
                  <th>{i + 1}</th>
                  <th>
                    <div className="avatar">
                      <div className="w-20 rounded-xl">
                        <img src={booking?.image} alt="" />
                      </div>
                    </div>
                  </th>
                  <td>{booking?.name}</td>
                  <td>{booking?.phone}</td>
                  <td>quantity: {booking?.quantity}</td>
                  <td>Tk. {booking?.price}</td>
                  <td>
                    {booking?.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking?._id}`}>
                        <button className="btn btn-primary rounded-sm btn-sm">
                          Pay
                        </button>
                      </Link>
                    )}
                    {booking?.price && booking?.paid && (
                      <span className="font-semibold text-green-500">Paid</span>
                    )}
                  </td>
                  <td>
                    {!booking?.paid ? (
                      <button
                        onClick={() => handleRemove(booking?._id)}
                        className="btn btn-primary rounded-sm btn-sm"
                      >
                        Remove
                      </button>
                    ) : (
                      <p className="text-success">Order confirmed</p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
