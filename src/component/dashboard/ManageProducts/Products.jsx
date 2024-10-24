import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = ({ product, handleDeleteProduct }) => {
  console.log(product);

  //add new arrival products handler
  const newArrivalHandler = (product) => {
    console.log(product);
    const { name, quantity, image, price, detail, category } = product;
    const newItem = {
      name,
      quantity,
      image,
      price,
      detail,
      category,
    };
    console.log(newItem);

    fetch("https://user-dashboard-server-five.vercel.app/new-arrival", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Product add to new arrival successfully");
      });
  };

  //add top selling products handler
  const topSellingHandler = (product) => {
    const { name, quantity, image, price, detail, category } = product;
    const topSell = {
      name,
      quantity,
      image,
      price,
      detail,
      category,
    };
    // console.log(topSell);

    fetch("https://user-dashboard-server-five.vercel.app/top-selling", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(topSell),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Product add to top selling successfully");
      });
  };

  return (
    <div className="border rounded-sm card card-compact bg-base-100 shadow-xl">
      <figure>
        <img className="h-40 w-full" src={product?.image} alt="" />
      </figure>
      <div className="p-5 card-body">
        <h2 className="card-title">{product?.name}</h2>
        <p>Price: {product?.price} $</p>
        <p className="text-justify">Detail: {product?.detail}</p>
        <p className="text-justify">Quantity: {product?.quantity}</p>
        <p className="text-justify">
          For{" "}
          <span className="text-blue-700 font-semibold">
            {product?.category}
          </span>
        </p>
        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={() => handleDeleteProduct(product?._id)}
            className="btn btn-sm rounded-sm btn-warning"
          >
            Delete
          </button>

          <Link to={`/dashboard/update-product/${product?._id}`}>
            <button className="btn btn-sm rounded-sm btn-error">Update</button>
          </Link>

          <button
            onClick={() => topSellingHandler(product)}
            className="btn btn-sm rounded-sm btn-success"
          >
            Add to Top sell
          </button>
          <button
            onClick={() => newArrivalHandler(product)}
            className="btn btn-sm rounded-sm btn-info"
          >
            Add to New Arrival
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
