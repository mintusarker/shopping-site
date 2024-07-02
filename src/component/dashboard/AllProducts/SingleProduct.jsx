import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-40" src={product?.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.name}</h2>
        <p>Price: {product?.price} $</p>
        <p>{product?.detail}</p>
        <p>
          {/* {product?.quantity >= 1 && (
            <>
              Only left {product?.quantity}
              {product?.quantity > 1
                ? " items"
                : product?.quantity == 1
                ? " item"
                : ""}
            </>
          )} */}


          {
            product?.quantity >= 1 && <>
             <p className="bg-green-800 text-white px-2 py-1 rounded inline">In Stock</p>
            </>
          }

          {product?.quantity == 0 && (
            <>
              <p className="text-white bg-rose-500 inline py-1 px-2 rounded"> Out of Stock</p>
            </>
          )}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/booking_product/${product?._id}`}>
            <button className="btn btn-sm btn-outline">Buy</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
