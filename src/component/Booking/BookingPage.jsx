import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import toast from "react-hot-toast";

const BookingPage = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  console.log(data);
    console.log(data[0].title);
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }

  const handleBookingProduct = () => {
    const product = {
      email: user.email,
      name: data[0]?.name,
    //   quantity: data[0]?.quantity,
      price: parseInt(data[0]?.price),
      detail: data[0]?.detail,
      image: data[0]?.image,
    };
    console.log(product);

    // save product information to database
    fetch("http://localhost:5000/bookings", {
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
        navigate("/dashboard/my_bookings");
        toast.success("Product Booked, Please ensure your payment", {
          duration: 1500,
        });
        
      });
  };

  return (
    <div>
      <div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 grid-cols-1 border-2 h-full lg:w-2/3 p-10 mx-16 ">
          <div>
            <img className="h-full" src={data[0].image} alt="image" />
          </div>

          <div className="flex flex-col gap-4">
            <p>Name: {data[0].name}</p>
            <p>Price: {data[0].price} $</p>
            <p>Detail: {data[0].detail}</p>
            <p>Only left {data[0]?.quantity} {data[0]?.quantity > 1 ? "items" : data[0]?.quantity == 1 ? "item" : ''} </p>
             <p className="break-words text-wrap text-amber-500">Easy return in 3 days , one year guarantee & we provide original product 
             </p>
            <button onClick={handleBookingProduct} className="btn text-xl btn-md btn-accent">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
