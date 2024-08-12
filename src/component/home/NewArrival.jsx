import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const [newItems, setNewItems] = useState();
  console.log(newItems);

  useEffect(() => {
    fetch("http://localhost:5000/new-arrival")
      .then((res) => res.json())
      .then((data) => setNewItems(data));
  }, []);

  return (
    <div className="mt-16 pb-20 px-20">
      <h2 className="text-center font-semibold uppercase text-3xl leading-loose mb-6">
        New Arrival Items
      </h2>
      <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full mx-auto">
        {newItems &&
          newItems?.map((items) => (
            <div
              key={items?._id}
              className="bg-base-100 rounded-sm shadow-xl card  relative"
            >
              <img src={items?.image} alt="Shoes" className="h-full" />
              <Link className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl">
                Buy
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewArrival;
