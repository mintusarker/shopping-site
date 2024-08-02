import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProvider";
import Products from "./Products";

const MyProducts = () => {
  const { user, loading } = useContext(AuthContext);

  // if (loading) {
  //   return <span className="loading loading-ring loading-lg"></span>;
  // }

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` http://localhost:5000/product?email=${user?.email}`
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
    fetch(` http://localhost:5000/products/${id}`, {
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
    <div className="">
      <h2 className="text-lg mb-8 border-b-4 border border-green-900 text-center w-auto mx-auto rounded-lg">
        My Products: {products?.length}
      </h2>

      <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 px-14 mt-16 mb-36">
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

export default MyProducts;
