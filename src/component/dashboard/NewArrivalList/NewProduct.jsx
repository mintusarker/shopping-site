import React from "react";

const NewProduct = ({ product, newArrivalDelete }) => {
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
        <p className="text-justify">Quantity: {product?.category}</p>
        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={() => newArrivalDelete(product?._id)}
            className="btn btn-sm rounded-sm btn-warning"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
