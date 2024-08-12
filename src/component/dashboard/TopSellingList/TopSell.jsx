import React from "react";

const TopSell = ({ product }) => {
  console.log(product);

  const handleRemove = (_id) => {
    fetch(`http://localhost:5000/top-selling/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={() => handleRemove(product?._id)}
            className="btn btn-sm rounded-sm btn-warning"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSell;

