import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleProduct = ({ product, addToCart }) => {
  return (
    <div className="card card-compact rounded-sm bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-40" src={product?.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.name}</h2>
        <p className="text-blue-700 font-semibold">Price: {product?.price} $</p>
        {/* <p>{product?.detail}</p> */}
        {/* <p>
          {product?.quantity >= 1 && (
            <>
              Only left {product?.quantity}
              {product?.quantity > 1
                ? " items"
                : product?.quantity == 1
                ? " item"
                : ""}
            </>
          )}
        </p> */}
        <p>
          {product?.quantity >= 1 && (
            <>
              <p className="bg-green-800 text-white text-xs px-2 py-1 rounded-sm inline">
                In Stock
              </p>
            </>
          )}

          {product?.quantity == 0 && (
            <>
              <p className="text-white bg-rose-500 text-xs inline py-1 px-2 rounded-sm">
              
                Out of Stock
              </p>
            </>
          )}
        </p>
        <div className="card-actions justify-end -mt-8">
          <Link to={`/booking_product/${product?._id}`}>
            <button className="btn btn-sm rounded-sm btn-outline">Buy</button>
          </Link>
          {/* <Link>
            <button
              disabled={product?.quantity == 0}
              onClick={() => addToCart(product?.name, product?._id)}
              className="btn btn-sm rounded-sm btn-outline"
            >
              Add to Cart
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
