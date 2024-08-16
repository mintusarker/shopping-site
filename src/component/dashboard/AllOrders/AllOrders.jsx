import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState();
  const [orderss, setOrderss] = useState();
  console.log(orders?.length);
  console.log(orders);

  useEffect(() => {
    fetch(`http://localhost:5000/bookings`, {
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

  //deleted order
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
        const restItems = orders.filter((order) => order?._id !== id);
        setOrders(restItems);
        toast.success("Order deleted");
      });
  };
  return (
    <div>
      <div className=" mb-16">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>picture</th>
              <th>Name</th>
              <th>quantity</th>
              <th>Phone No.</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => (
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
                <td>{order?.quantity} </td>
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
