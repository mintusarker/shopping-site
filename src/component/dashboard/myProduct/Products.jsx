import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = ({ product, handleDeleteProduct }) => {
  console.log(product);

  return (
    <div className="border card card-compact bg-base-100 shadow-xl">
      <figure>
        <img className="h-40 w-full" src={product?.image} alt="" />
      </figure>
      <div className="p-5 card-body">
        <h2 className="card-title">{product?.name}</h2>
        <p>Price: {product?.price} $</p>
        <p className="text-justify">Detail: {product?.detail}</p>
        <p className="text-justify">Quantity: {product?.quantity}</p>
        <div className="flex justify-between items-center flex-wrap gap-1">
          <button
            onClick={() => handleDeleteProduct(product?._id)}
            className="btn btn-sm btn-warning"
          >
            Delete
          </button>
          <Link to={`/dashboard/update-product/${product?._id}`}>
            <button className="btn btn-sm btn-error">Update</button>
          </Link>
        </div>
      </div>
    </div>

   
  );
};

export default Products;
