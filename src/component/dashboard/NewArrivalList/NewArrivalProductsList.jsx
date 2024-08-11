import React, { useEffect, useState } from "react";
import NewProduct from "./NewProduct";

const NewArrivalProductsList = () => {
  const [newArrival, setNewArrival] = useState();

  console.log(newArrival);

  useEffect(() => {
    fetch("http://localhost:5000/new-arrival")
      .then((res) => res.json())
      .then((data) => setNewArrival(data));
  }, []);

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-16 mt-7 pb-24">
        {newArrival.map((product) => (
          <NewProduct key={product?._id} product={product}></NewProduct>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProductsList;
