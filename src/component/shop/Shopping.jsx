import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "../dashboard/AllProducts/SingleProduct";

const Shopping = () => {
  const [products, setProducts] = useState();

  const { data , isLoading } = useQuery({
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
   if(key){
    fetch(`http://localhost:5000/search/${key}`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      console.log(data);
    }) 
  }
  else{
    fetch(` http://localhost:5000/products`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      console.log(data);
  }
 )}
};

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl my-6 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">
        Products
      </h2>
      <div className="flex justify-center">
        <input
          onChange={handleSearch}
          className="border border-slate-400 outline-none rounded-full w-60 text-start px-3 py-1"
          placeholder="search product"
          type="text"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-14 mt-12 pb-24">
        {products?.map((product) => (
          <SingleProduct key={product?._id} product={product}></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
