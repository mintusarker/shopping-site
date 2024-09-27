import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";

const itemSize = [
  { value: 39, _id: 1 },
  { value: 40, _id: 2 },
  { value: 41, _id: 3 },
  { value: 42, _id: 4 },
  { value: 43, _id: 5 },
  { value: 44, _id: 6 },
];

const BookingPage = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  console.log('hhhhhhh',data);
  const navigate = useNavigate();

  //booking quantity
  const [quantity, setQuantity] = useState(1);

  // total
  const [total, setTotal] = useState(data[0]?.price);

  //product quantity update
  const [updateQuantity, setUpdateQuantity] = useState(
    parseInt(data[0]?.quantity)
  );

  //phone number store
  const [phone, setPhone] = useState();
  console.log(phone);

  //phone number error
  const [numberError, setNumberError] = useState();
  // console.log(numberError);

  //product size
  const [size, setSize] = useState();
  // console.log(size);
  const [sizeError, setSizeError] = useState();
  // console.log(sizeError);

  //increase quantity handler
  const handleIncrement = () => {
    if (quantity <= parseInt(data[0]?.quantity) + 1) {
      setQuantity((prev) => prev + 1);

      //price update
      const singlePrice = parseInt(data[0]?.price);
      const price = quantity * singlePrice + singlePrice;
      setTotal(price);

      //quantity update
      const productQuantity = parseInt(data[0]?.quantity);
      const update = productQuantity - quantity;
      setUpdateQuantity(update);
    }
  };

  //decrease quantity handler
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);

      //price update
      const singlePrice = parseInt(data[0]?.price);
      const price = total - singlePrice;
      setTotal(price);

      //quantity update
      const update = parseInt(updateQuantity + 1);
      setUpdateQuantity(update);
    }
  };

  //select size
  const selectSizeHandler = (id) => {
    const field = document.getElementById("size");
    console.log(field);

    const data = itemSize.find((sz) => sz?._id == id);
    const value = data.value;
    console.log(value);

    setSize(value);
    setSizeError(" ");
  };

  //store phone number handler
  const phoneStoreHandler = () => {
    const phone = document.getElementById("phone");
    const phoneNumber = phone.value;
    setPhone(phoneNumber);
    console.log(phoneNumber);
  };

  // booking product handler
  const handleBookingProduct = () => {
    if (!size) {
      setSizeError("Please select a size");
      return;
    }

    //phone number handle
    const phone = document.getElementById("phone");
    const phoneNumber = phone.value;
    if (!Number(phoneNumber) || null) {
      setNumberError("Need a valid phone number");
      return;
    }
    if (phoneNumber.length < 11) {
      setNumberError("Phone number must be greater or equal to 11 digit");
      return;
    }

    const product = {
      email: user.email,
      name: data[0]?.name,
      quantity: quantity,
      // price: parseInt(data[0]?.price),
      price: parseInt(total + 10),
      detail: data[0]?.detail,
      phone: phoneNumber,
      image: data[0]?.image,
      size: size,
      // id: data[0]?._id,
    };
    setNumberError("");
    console.log(product);

    // save product information to database
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((result) => {
        console.log(result);
        navigate("/dashboard/my_bookings");
        toast.success("Product Booked, Please ensure your payment", {
          duration: 1500,
        });
      });

    // update product quantity
    const latestQuantity = {
      quantity: updateQuantity,
      id: data[0]?._id,
    };
    console.log(latestQuantity);
    fetch("http://localhost:5000/product", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(latestQuantity),
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="my-12 px-10">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-3 grid-cols-1 border-2 h-full mx-auto lg:w-2/3 p-5">
        <div className="flex flex-col">
          <img className="w-full h-56" src={data[0]?.image} alt="image" />

          <div>
            <label htmlFor="">Mobile: </label>
            <input
              onChange={phoneStoreHandler}
              id="phone"
              type=""
              name="phone"
              className="border border-slate-300 text-sm py-1 mt-4 outline-none pl-2 rounded-sm"
              placeholder="Phone Number"
              minLength="11"
            />
          </div>
          <p className="text-red-500 mt-1 text-xs font-semibold">
            {numberError}
          </p>

          <div className="border border-slate-500 flex flex-col justify-center mx-14 p-4 mt-6 text-xs w-48">
            <p className="text-center -my-2 font-semibold">Order Summary</p>
            <div className="flex flex-col mt-3">
              <p>Name: {data[0]?.name} </p>
              <p>Category : {data[0]?.category} </p>
              <p>Price: {total + 10} $</p>
              <p>quantity: {quantity}</p>
              <p className="text-red-500 font-semibold">Size : {size}</p>
              <p>Phone: {phone}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-[15px]">
          <p>Name: {data[0]?.name}</p>
          <p>Price: {data[0]?.price} $</p>
          <p>Detail: {data[0]?.detail}</p>
          <p>
            {data[0]?.quantity >= 1 && (
              <p>
                Only left{" "}
                <span className="text-red-700 font-semibold">
                  {updateQuantity}
                </span>
                {updateQuantity > 1
                  ? " items"
                  : updateQuantity == 1
                  ? " item"
                  : ""}
              </p>
            )}

            {data[0]?.quantity == 0 && (
              <>
                <p className="text-red-600"> Not Available</p>
              </>
            )}
          </p>
          <div className="w-auto flex flex-wrap items-center gap-3">
            <label>Select Size :</label>
            <div className="flex flex-wrap gap-2">
              {itemSize.map((size) => (
                <Link
                  onClick={() => selectSizeHandler(size?._id)}
                  id="size"
                  className="btn btn-sm rounded-sm"
                  key={size?._id}
                  name="size"
                >
                  {size?.value}
                </Link>
              ))}
            </div>
            <p className="text-red-600 text-sm">{sizeError}</p>
          </div>
          <div className="w-auto flex flex-wrap items-center gap-3">
            <p>Quantity :</p>
            <div className="flex gap-2 items-center">
              <button onClick={handleDecrement}>
                <FaMinus></FaMinus>
              </button>
              <input
                id="quantity"
                type="text"
                className="border border-slate-500 outline-none text-center"
                value={quantity}
              />
              <button onClick={handleIncrement}>
                <FaPlus></FaPlus>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-center">Price: {total} $</p>
            <p className="font-semibold text-center">
              Delivery Charge: {total == 0 ? 0 : 10} $
            </p>
          </div>

          <div className="font-semibold text-center border input-bordered py-1">
            Sub-Total : {quantity == 0 ? 0 : total + 10} $
          </div>

          <p className="break-words text-wrap text-amber-500">
            Easy return in 3 days , one year guarantee & we provide original
            product
          </p>
          {quantity == 0 && (
            <p className="text-red-600">
              Product quantity at least should be 1 or more
            </p>
          )}
          {quantity > parseInt(data[0]?.quantity) + 1 && (
            <p className="text-red-600">Product quantity exceed</p>
          )}

          <div className="flex flex-warp gap-5 items-center">
            <button
              onClick={handleBookingProduct}
              disabled={
                data[0]?.quantity == 0 ||
                quantity == 0 ||
                quantity > parseInt(data[0]?.quantity) + 1 ||
                !user
              }
              className="btn uppercase btn-sm rounded btn-info"
            >
              Confirm
            </button>

            <div>
              {!user && (
                <p className="font-semibold">
                  Please Login to confirm order
                  <Link
                    className="btn btn-xs btn-neutral mx-2 rounded"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default BookingPage;
