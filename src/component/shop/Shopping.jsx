import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";
import { AuthContext } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";

const Shopping = () => {
  const [allProducts, setAllProducts] = useState();
  console.log(allProducts);
  const [item, setItem] = useState();
  console.log(item);

  const [products, setProducts] = useState();

  const { addToCart, user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/products`);
        const data = await res.json();
        setAllProducts(data);
        setItem(data);
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  //search
  const handleSearch = (e) => {
    e.preventDefault();
    const key = e.target.value;
    if (key) {
      fetch(`http://localhost:5000/search/${key}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    } else {
      fetch(` http://localhost:5000/products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    }
  };

  //get order by email
  const {
    data: bookings = [],
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings/email?email=${user?.email}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  // price sorting low to high
  const priceLowToHigh = () => {
    setProducts("");
    fetch("http://localhost:5000/priceLow")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  // price sorting high to low
  const priceHighToLow = () => {
    setProducts("");
    fetch("http://localhost:5000/priceHigh")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  //default Price
  const defaultPrice = () => {
    setProducts("");
    setAllProducts(item);
  };

  //filter items
  const mensItemHandler = () => {
    const data = allProducts?.filter((product) => product.category == "Men");
    setProducts(data);
    console.log(data);
  };

  const womansItemHandler = () => {
    const data = allProducts?.filter((product) => product.category == "Women");
    setProducts(data);
    console.log(data);
  };

  const kidsItemsHandler = () => {
    const data = allProducts?.filter((product) => product.category == "Kids");
    setProducts(data);
    console.log(data);
  };

  const allItemsHandler = () => {
    setProducts(allProducts);
    console.log(data);
  };

  //filter with price range
  const priceHandlerOne = () => {
    setProducts("");
    const data = item.filter((p) => p?.price > 0 && p?.price <= 100);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerTwo = () => {
    setAllProducts("");
    const data = item.filter((p) => p?.price >= 100 && p?.price <= 200);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerThree = () => {
    setAllProducts("");
    const data = item.filter((p) => p?.price >= 200 && p?.price <= 300);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerFour = () => {
    setProducts("");
    const data = item.filter((p) => p?.price >= 300 && p?.price <= 400);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerFive = () => {
    setProducts("");
    const data = item.filter((p) => p?.price >= 400);
    setAllProducts(data);
    console.log(data);
  };

  const defaultListHandler = () => {
    setProducts("");
    setAllProducts("");
    setAllProducts(item);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mt-3 mb-7">
      <div className=" flex justify-evenly items-center">
        <div></div>
        <input
          onChange={handleSearch}
          className="border border-slate-400 outline-none rounded-md w-60 text-start px-3 h-10"
          placeholder="search product"
          type="text"
        />

        <div className="relative">
          <Link
            className="hover:bg-slate-200 h-14 w-14 flex justify-center items-center rounded-sm"
            to="/dashboard/my_bookings"
          >
            <BsCartCheck className="text-3xl text-red-500 h-8 w-8" />
          <span className="absolute top-1 right-2 opacity-65 bg-black text-white flex justify-center items-center px-2 rounded-full">
            {user?.email ? bookings?.length : 0}
          </span>
          </Link>
        </div>
      </div>

      <div className="flex pl-10 mt-10 pb-12">
        <div className="flex flex-col gap-3 w-40 mr-12">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1">
              <input
                onClick={defaultPrice}
                type="radio"
                name="radio-5"
                className=""
                id=""
              />
              <span className="text-sm font-semibold">Default</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                onClick={priceLowToHigh}
                type="radio"
                name="radio-5"
                id=""
              />
              <span className="text-sm font-semibold">Low To High</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                onClick={priceHighToLow}
                type="radio"
                className="cursor-pointer"
                name="radio-5"
                id=""
              />
              <span className="text-sm font-semibold">High To Low</span>
            </div>
          </div>
          <p className="text-md font-semibold">Category</p>
          <button
            onClick={mensItemHandler}
            className="btn btn-sm btn-neutral rounded-sm uppercase"
          >
            Men
          </button>
          <button
            onClick={womansItemHandler}
            className="btn btn-sm btn-neutral rounded-sm uppercase"
          >
            Women
          </button>
          <button
            onClick={kidsItemsHandler}
            className="btn btn-sm btn-neutral rounded-sm uppercase"
          >
            Kids
          </button>
          <button
            onClick={allItemsHandler}
            className="btn btn-sm btn-neutral rounded-sm uppercase"
          >
            All Items
          </button>

          {/* price range filter section */}
          <div className="my-8 flex flex-col gap-1">
            <p className="text-md font-semibold mb-1">Price Range</p>

            <div className="flex justify-center items-center gap-6 bg-slate-300 rounded-sm py-1">
              <input
                onClick={priceHandlerOne}
                type="radio"
                name="radio-4"
                className="radio radio-sm radio-success"
              />
              <p>0 - 100 $</p>
            </div>

            <div className="flex justify-center items-center gap-2 bg-slate-300 rounded-sm py-1">
              <input
                onClick={priceHandlerTwo}
                type="radio"
                name="radio-4"
                className="radio radio-sm radio-success"
              />
              <p>100 - 200 $</p>
            </div>

            <div className="flex justify-center items-center gap-2 bg-slate-300 rounded-sm py-1">
              <input
                onClick={priceHandlerThree}
                type="radio"
                name="radio-4"
                className="radio radio-sm radio-success"
              />
              <p>200 - 300 $</p>
            </div>

            <div className="flex justify-center items-center gap-2 bg-slate-300 rounded-sm py-1">
              <input
                onClick={priceHandlerFour}
                type="radio"
                name="radio-4"
                className="radio radio-sm radio-success"
              />
              <p>300 - 400 $</p>
            </div>

            <div className="flex justify-center items-center gap-2 bg-slate-300 rounded-sm py-1">
              <input
                onClick={priceHandlerFive}
                type="radio"
                name="radio-4"
                className="radio radio-sm radio-success"
              />
              <p>
                <span className="p-3">&#8805;</span> 400 $
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center bg-slate-300 rounded-sm py-1 mt-4">
            <input
              onClick={defaultListHandler}
              type="radio"
              name="radio-4"
              className="radio radio-sm radio-success"
            />
            <p>
              <span className="p-3">Default View</span>
            </p>
          </div>
        </div>
        <hr className="bg-slate-300 w-[1px] h-[650px]" />
        <div className="w-ful">
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:px-16 md:px-16 px-4 pb-20 lg:ml-0 md:ml-0 ml-6">
            {products
              ? products?.map((product) => (
                  <SingleProduct
                    key={product?._id}
                    product={product}
                    // addToCart={addToCart}
                  ></SingleProduct>
                ))
              : allProducts &&
                allProducts?.map((product) => (
                  <SingleProduct
                    key={product?._id}
                    product={product}
                    addToCart={addToCart}
                  ></SingleProduct>
                ))}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-end pb-12 px-16">
        <button className="btn btn-md text-lg rounded-sm btn-neutral">Load More</button>
      </div> */}
    </div>
  );
};

export default Shopping;
