import React, { useEffect, useState } from "react";
import NewProduct from "./NewProduct";
import toast from "react-hot-toast";

const NewArrivalProductsList = () => {
  const [newArrival, setNewArrival] = useState();

  console.log(newArrival);

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
        if (data.deletedCount > 0) {
          toast.success("New arrival product removed");
        }
      });
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-16 mt-7 pb-24">
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
