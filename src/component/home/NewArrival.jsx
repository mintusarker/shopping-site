import React from "react";
import { Link } from "react-router-dom";

const NewArrival = () => {
  return (
    <div className="mt-16 pb-20 px-20">
      <h2 className="text-center font-semibold uppercase text-3xl leading-loose mb-6">
        New Arrival Items
      </h2>
      <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full mx-auto">
        <div className="bg-base-100 rounded-sm shadow-xl card  relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="h-full"
          />
          <Link className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl">
            Buy
          </Link>
        </div>

        <div className="bg-base-100 rounded-sm shadow-xl card relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="h-full"
          />
          <Link className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl">
            Buy
          </Link>
        </div>

        <div className="bg-base-100 rounded-sm shadow-xl card h-[350px] relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="h-full"
          />
          <Link className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl">
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
