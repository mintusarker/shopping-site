import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddProduct = (data) => {
    const product = {
      name: data.name,
      quantity: data.quantity,
      price: parseInt(data.price),
      detail: data.detail,
      image: data.image,
      email: data.email,
    };
    console.log(product);
   

    // save product information to database
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Product added successfully");
        reset()
        navigate('/dashboard/my_products');
      });
  };

  return (
    <div className="mt-8 mb-28">
      <h2 className="text-2xl mb-6 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">Add Product</h2>

      <form className="w-full" onSubmit={handleSubmit(handleAddProduct)}>
        <div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                defaultValue={user?.email} 
                readOnly
                className="input input-bordered w-60"
                {...register("email", {
                    required: "Email is required",
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-60"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Quantity</span>
              </label>
              <input
                type="number"
                min={1}
                placeholder="Quantity"
                className="input input-bordered w-60"
                {...register("quantity", {
                  required: "Quantity is required",
                })}
              />
              {errors.quantity && (
                <p className="text-red-600">{errors.quantity.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                placeholder="Price"
                className="input input-bordered w-60"
                {...register("price", {
                  required: "Price is required",
                })}
              />
              {errors.price && (
                <p className="text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image Url</span>
              </label>
              <textarea
                type="text"
                placeholder="Image url"
                className="input input-bordered h-16"
                {...register("image", {
                  required: "Photo is required",
                })}
              />
              {errors.image && (
                <p className="text-red-600">{errors.image.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product's Detail</span>
              </label>
              <textarea
                type="text"
                placeholder="Product's Detail"
                className="input input-bordered h-24"
                {...register("detail", {
                  required: "Description is required",
                })}
              />
              {errors.detail && (
                <p className="text-red-600">{errors.detail.message}</p>
              )}
            </div>
          </div>
        </div>

        <input
          className="btn w-full btn-info text-white text-lg my-3"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProduct;
