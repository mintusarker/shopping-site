import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const [newItems, setNewItems] = useState();
  console.log(newItems?.length);
  const [nextIndex, setNextIdex] = useState(3);

  const [noMoreQuantity, setNoMoreQuantity] = useState();
  console.log(noMoreQuantity);

  useEffect(() => {
    fetch("http://localhost:5000/new-arrival")
      .then((res) => res.json())
      .then((data) => setNewItems(data));
  }, []);

  const loadMoreNewProduct = () => {
    if (nextIndex < newItems?.length) {
      setNextIdex((prev) => prev + 3);
    } else {
      setNoMoreQuantity("Explore More");
    }
  };

  // const seeLessNewProduct = () => {
  //   // setNextItems((prev) => prev - 3);
  //   // const items = nextItems - 3;
  //   // setNextItems(items)
  //   setNextIdex(3);
  // };

  return (
    <div className="mt-16 pb-20 px-24">
      <h2 className="text-center font-semibold uppercase text-3xl leading-loose mb-6">
        New Arrival Items
      </h2>
      <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full mx-auto">
        {newItems &&
          newItems?.slice(0, nextIndex).map((items) => (
            <div
              key={items?._id}
              className="bg-base-100 rounded-sm shadow-xl card  relative"
            >
              <img src={items?.image} alt="Shoes" className="h-80 w-full" />
              <Link
                to={`new_arrival/${items._id}`}
                className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl"
              >
                Buy
              </Link>

              {/* <Link to={`/booking_product/${items?._id}`}>
            <button className="btn btn-sm rounded-sm btn-outline">Buy</button>
          </Link> */}
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center">
      <Link to={'/shop'} className="text-center font-medium text-xl mt-4 uppercase">{noMoreQuantity}</Link>
      </div>
      <div className="flex justify-end items-center">
        {/* {nextIndex == newItems?.length ? (
          <button
            onClick={seeLessNewProduct}
            className="btn btn-md bg-black text-slate-200 hover:bg-gradient-to-t to-green-700 from-slate-900 uppercase rounded-sm mt-4"
          >
            See Less
          </button>
        ) : (
          <button
            onClick={loadMoreNewProduct}
            className="btn btn-md bg-black text-slate-200 hover:bg-gradient-to-t to-green-700 from-slate-900 uppercase rounded-sm mt-4"
          >
            Load More
          </button>
        )} */}
        <button
          onClick={loadMoreNewProduct}
          className="btn btn-md bg-slate-800 text-slate-200 hover:bg-gradient-to-t to-green-700 from-slate-900 uppercase rounded-sm mt-4"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
