import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProvider";
import Products from "./Products";

const MyProducts = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          ` http://localhost:5000/product?email=${user?.email}`
        );
        const data = await res.json();
        // console.log(data);
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
      <h2 className="text-2xl mb-6 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">
        My Products: {products?.length}
      </h2>

      <div className="gap-5 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
