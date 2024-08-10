import React from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const data = useLoaderData();
  console.log(data[0].title);
  const navigate = useNavigate();

  //update product
  const handleUpdateUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const price = form.price.value;
    const image = form.image.value;
    const detail = form.detail.value;

    const updateProduct = {
      name,
      quantity,
      price,
      image,
      detail,
    };

    console.log(updateProduct);

    fetch(` http://localhost:5000/products/${data[0]?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("product updated");
          navigate("/dashboard/manage_products");
          console.log(data);
        }
      });
  };

  return (
    <div className="mt-16 mb-32 border w-1/2 p-4 mx-auto">
      <h2 className="text-2xl mb-6 border-b-4 border border-green-900 text-center w-48 mx-auto rounded-lg">
        Update Product
      </h2>

      <form onSubmit={handleUpdateUser} className="flex flex-col">
        <label htmlFor="">Product Name</label>
        <input
          className="border border-black  w-full p-2 mb-4"
          defaultValue={data[0]?.name}
          type="text"
          name="name"
          placeholder="Product Name"
          required
        />
        <label htmlFor="">Product Quantity</label>
        <input
          className="border border-black  w-full p-2 mb-4"
          defaultValue={data[0]?.quantity}
          type="text"
          name="quantity"
          placeholder="Quantity"
          required
        />
        <label htmlFor="">Price</label>
        <input
          className="border border-stone-500 w-full p-2 mb-4"
          defaultValue={data[0]?.price}
          type="text"
          name="price"
          placeholder="Price"
          required
        />
        <label htmlFor="">Product's Detail</label>
        <textarea
          type="text"
          className="border border-stone-500 w-full h-24 p-2 mb-4"
          name="detail"
          defaultValue={data[0]?.detail}
        />

        <label htmlFor="">Image Url</label>
        <textarea
          type="text"
          className="border border-stone-500 w-full p-2 h-32"
          name="image"
          placeholder="Price"
          defaultValue={data[0]?.image}
          required
        />

        <br />
        <button className="btn rounded-sm btn-success">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
