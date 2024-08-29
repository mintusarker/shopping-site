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
  const navigate = useNavigate();

  //booking quantity
  const [quantity, setQuantity] = useState(1);
  // total
  const [total, setTotal] = useState(data[0]?.price);
  //product quantity update
  const [updateQuantity, setUpdateQuantity] = useState(
    parseInt(data[0]?.quantity)
  );

  const [numberError, setNumberError] = useState();
  // console.log(numberError);

  //product size
  const [size, setSize] = useState();
  // console.log(size);

  const [sizeError, setSizeError] = useState();
  // console.log(sizeError);

  // booking product handler
  const handleBookingProduct = () => {
    if (!size) {
      setSizeError("Please select a size");
      return;
    }

    //phone number handle
    const phone = document.getElementById("phone");
    const phoneNumber = phone.value;
    // console.log(phoneNumber);
    if (!Number(phoneNumber) || phoneNumber.length < 11 || null) {
      setNumberError("Need a valid phone number");
      return;
    }

    const product = {
      email: user.email,
      name: data[0]?.name,
      quantity: quantity,
      // price: parseInt(data[0]?.price),
      price: parseInt(total),
      detail: data[0]?.detail,
      phone: phoneNumber,
      image: data[0]?.image,
      productSize: size,
    };
    setNumberError("");
    console.log(product);

    // save product information to database
    // fetch("http://localhost:5000/bookings", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: `bearer ${localStorage.getItem("accessToken")}`,
    //   },
    //   body: JSON.stringify(product),
    // })
    //   .then((res) => {
    //     res.json();
    //     console.log(res);
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     navigate("/dashboard/my_bookings");
    //     toast.success("Product Booked, Please ensure your payment", {
    //       duration: 1500,
    //     });
    //   });
  };

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
      const totalPrice = total - singlePrice;
      setTotal(totalPrice);

      //quantity update
      const update = parseInt(updateQuantity + 1);
      setUpdateQuantity(update);
    }
  };

  //select size
  const selectSizeHandler = (value) => {
    // const data = document.getElementById("size");
    // if (value == 39) {
    //   data.classList.add("bg-red-300");
    // } else if (value == 41) {
    //   data.classList.add("bg-red-500");
    // } else if (value == 42) {
    //   data.classList.add("bg-red-700");
    // } else if (value == 43) {
    //   data.classList.add("bg-red-300");
    // } else if (value == 44) {
    //   data.classList.add("bg-red-800");
    // } else if (value == 45) {
    //   data.classList.add("bg-red-900");
    // }
    console.log(value);
    setSize(value);
    setSizeError(" ");
  };

  return (
    <div className="my-12">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-3 grid-cols-1 border-2 h-full mx-auto bg-red-100 lg:w-2/3 p-8">
        <div>
          <img className="w-full h-64" src={data[0]?.image} alt="image" />

          <div>
            <label htmlFor="">Mobile: </label>
            <input
              id="phone"
              type=""
              name="phone"
              className="border border-black mt-12 outline-none pl-2 py-1 rounded-sm"
              placeholder="Mobile Number"
              minLength="11"
            />
          </div>
          <p className="text-red-500">{numberError}</p>
        </div>

        <div className="flex flex-col gap-4">
          <p>Name: {data[0]?.name}</p>
          <p>Price: {data[0]?.price} $</p>
          <p>Detail: {data[0]?.detail}</p>
          <p>
            {data[0]?.quantity >= 1 && (
              <>
                Only left {updateQuantity}
                {data[0]?.quantity > 1
                  ? " items"
                  : data[0]?.quantity == 1
                  ? " item"
                  : ""}
              </>
            )}

            {data[0]?.quantity == 0 && (
              <>
                <p className="text-red-600"> Not Available</p>
              </>
            )}
          </p>
          <div className="w-auto flex flex-wrap items-center gap-3">
            <label>Select Size :</label>
            <div className="flex gap-2">
              {itemSize.map((size) => (
                <button
                  onClick={() => selectSizeHandler(size?.value)}
                  id="size"
                  className="menu btn btn-sm rounded-sm"
                  key={size?._id}
                  name="size"
                >
                  {size?.value}
                </button>
              ))}

              <input type="button" value="" />
            </div>
            <p className="text-red-600 text-sm">{sizeError}</p>
          </div>
          <div className="w-auto flex flex-wrap items-center gap-3">
            {/* <p> Quantity :</p> */}
            <div>Quantity :</div>
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
          <p className="font-semibold border text-center">
            Total Price: {total} $
          </p>

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
