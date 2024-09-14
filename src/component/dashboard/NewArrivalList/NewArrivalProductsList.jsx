import React, { useEffect, useState } from "react";
import NewProduct from "./NewProduct";
import toast from "react-hot-toast";

const NewArrivalProductsList = () => {
  const [newArrival, setNewArrival] = useState();
  // console.log(newArrival);

  useEffect(() => {
    fetch("http://localhost:5000/new-arrival")
      .then((res) => res.json())
      .then((data) => setNewArrival(data));
  }, []);

  //delete
  const newArrivalDelete = (id) => {
    fetch(`http://localhost:5000/new-arrival/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const restItems = newArrival?.filter((newArr) => newArr?._id !== id);
        setNewArrival(restItems);
        if (data.deletedCount > 0) {
          toast.success("New arrival product removed");
        }
      });
  };

  return (
    <div>
      <h2 className="text-xl leading-6 mb-6 border-b-4 border border-green-900 text-center w-48 rounded-sm">
        New Arrival: {newArrival?.length}
      </h2>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 my-7 pb-24">
        {newArrival?.map((product) => (
          <NewProduct
            key={product?._id}
            product={product}
            newArrivalDelete={newArrivalDelete}
          ></NewProduct>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProductsList;
