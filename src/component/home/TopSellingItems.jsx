import React from "react";
import { Link } from "react-router-dom";

const TopSellingItems = () => {
  return (
    <div className="my-24 px-16">
      <h2 className="text-center font-semibold uppercase text-3xl leading-loose mb-6">
        Top Selling Items
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <div className="bg-base-100 rounded-sm shadow-xl w-96 card h-96 relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="h-full"
          />
          {/* <div className="flex justify-center items-center w-20 h-11"> */}
            <Link className="uppercase text-black flex justify-center items-center bg-white w-20 h-11 rounded-sm">
              Buy
            </Link>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default TopSellingItems;
