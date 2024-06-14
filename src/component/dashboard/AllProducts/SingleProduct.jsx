import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {


//   const handlePayment = () => {
//     toast.error(
//       `Payment method not implement for ${product?.title} right now!!`,
//       { duration: 1000 }
//     );
//   };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={product?.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product?.name}
        </h2>
        <p>Price: {product?.price} $</p>
        <p>{product?.detail}</p>
        <p>Only left {product?.quantity} {product?.quantity > 1 ? "items" : product?.quantity == 1 ? "item" : ''} </p>
        <div className="card-actions justify-end">
        <Link to={`/dashboard/booking_product/${product?._id}`}>
            <button className="btn btn-sm btn-outline">Buy</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
