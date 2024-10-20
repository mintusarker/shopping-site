import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProvider";
import Products from "./Products";

const StoreProducts = () => {
  const { loading } = useContext(AuthContext);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` https://user-dashboard-server-five.vercel.app/products`
        );
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  //delete product
  const handleDeleteProduct = (id) => {
    fetch(` https://user-dashboard-server-five.vercel.app/products/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Product deleted successfully");
        }
      });
  };

  return (
    <div className="px-16">
      <h2 className="text-xl leading-6 border-b-4 border border-green-900 text-center w-44 mt-5 rounded-sm">
        Total Products: {products?.length}
      </h2>

      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 my-8 mb-36">
        {products?.map((product) => (
          <Products
            key={product._id}
            product={product}
            handleDeleteProduct={handleDeleteProduct}
          ></Products>
        ))}
      </div>
    </div>
  );
};

export default StoreProducts;
