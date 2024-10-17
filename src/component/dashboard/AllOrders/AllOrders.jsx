import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProvider";

const AllOrders = () => {
  const [orders, setOrders] = useState();

  const { loading } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://user-dashboard-server-five.vercel.app/all_bookings`, {
      method: "GET",
      headers: {
        "content-type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  //deleted order
  const handleRemove = (id) => {
    fetch(`https://user-dashboard-server-five.vercel.app/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const restItems = orders?.filter((order) => order?._id !== id);
        setOrders(restItems);
        toast.success("Order deleted");
      });
  };

  return (
    <div className="px-16">
      <h2 className="text-xl leading-6 my-4 border-b-4 border border-green-900 text-center w-44 rounded-sm">
        Total Products: {orders?.length}
      </h2>
      <div className=" mb-16 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Phone No.</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length &&
              orders?.map((order, i) => (
                <tr key={order?._id}>
                  <th>{1 + i}</th>
                  <th>
                    <img
                      className="h-12 w-12 rounded-full"
                      src={order?.image}
                      alt=""
                      srcSet=""
                    />
                  </th>
                  <td>{order?.name} </td>
                  <td>Quantity : {order?.quantity} </td>
                  <td>Size : {order?.size} </td>
                  <td>{order?.phone} </td>
                  <td className="font-semibold text-green-500">
                    {order?.paid === true ? "Paid" : "pending"}{" "}
                  </td>

                  <td>
                    <button
                      onClick={() => handleRemove(order?._id)}
                      className="btn btn-xs btn-neutral text-white rounded-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!orders?.length && (
        <p className="text-xl flex justify-center items-center">
          No Active Orders
        </p>
      )}
    </div>
  );
};

export default AllOrders;
