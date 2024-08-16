import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";

const Shopping = () => {
  const [products, setProducts] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/products`);
        const data = await res.json();
        setProducts(data);
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  //search
  const handleSearch = (e) => {
    e.preventDefault();
    const key = e.target.value;
    if (key) {
      fetch(`http://localhost:5000/search/${key}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          console.log(data);
        });
    } else {
      fetch(` http://localhost:5000/products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          console.log(data);
        });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="my-7">
      <div className="flex justify-center">
        <input
          onChange={handleSearch}
          className="border border-slate-400 outline-none rounded-md w-60 text-start px-3 py-1"
          placeholder="search product"
          type="text"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-16 mt-7 pb-12">
        {products?.map((product) => (
          <SingleProduct key={product?._id} product={product}></SingleProduct>
        ))}
      </div>
      {/* <div className="flex justify-end pb-12 px-16">
        <button className="btn btn-md text-lg rounded-sm btn-neutral">Load More</button>
      </div> */}
    </div>
  );
};

export default Shopping;
