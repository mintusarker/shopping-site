import React from "react";
import SingleProduct from "./SingleProduct";
// import { AuthContext } from "../../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const AllProducts = () => {
  
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/products`);
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <div>
      <h2 className="text-2xl my-6 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">
        Products
      </h2>

      <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-14 mt-12 mb-28">
        {products?.map((product) => (
          <SingleProduct key={product?._id} product={product}></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
