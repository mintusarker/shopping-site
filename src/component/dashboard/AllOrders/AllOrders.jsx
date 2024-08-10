import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState();
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
  return (
    <div>
      <div className="overflow-x-auto">
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
                <th> <img className="h-12 w-12 rounded-full" src={order?.image} alt="" srcset="" /> </th>
                <td>{order?.name} </td>
                <td>{order?.quantity} </td>
                <td>{order?.phone} </td>
                <td className="font-semibold text-green-500"> {order?.paid === true ? "Paid" : "pending"} </td>
               
                <td>
                  <button
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
    </div>
  );
};

export default AllOrders;
