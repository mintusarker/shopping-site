import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellingItems = () => {
  const [topSellItems, setTopSellItems] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/top-selling`)
      .then((res) => res.json())
      .then((data) => setTopSellItems(data));
  }, []);

  return (
    <div className="mt-16 px-20">
      <h2 className="text-center font-semibold uppercase text-3xl leading-loose mb-6">
        Top Selling Items
      </h2>
      <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full mx-auto">
        {topSellItems &&
          topSellItems?.map((topSell) => (
            <div
              key={topSell?._id}
              className="bg-base-100 rounded-sm shadow-xl card  relative"
            >
              <img src={topSell?.image} alt="Shoes" className="h-full" />
              <Link className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl">
                Buy
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopSellingItems;
