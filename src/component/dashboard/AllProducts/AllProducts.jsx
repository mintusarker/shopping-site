import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  const [products, setProducts] = useState();

  console.log(products);

  useEffect(() => {
    fetch("https://user-dashboard-server-five.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl my-6 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">
        Products
      </h2>

      <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-14 my-16">
        {products?.map((product) => (
          <SingleProduct key={product?._id} product={product}></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
