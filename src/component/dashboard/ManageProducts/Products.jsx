import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = ({ product, handleDeleteProduct }) => {
  console.log(product);

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

          <button className="btn btn-sm rounded-sm btn-success">
            Add to Top sell
          </button>
          <button className="btn btn-sm rounded-sm btn-info">
            Add to New Arrival
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
