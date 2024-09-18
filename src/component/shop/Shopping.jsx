import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";
import { AuthContext } from "../../auth/AuthProvider";

const Shopping = () => {
  const [allProducts, setAllProducts] = useState();
  console.log(allProducts);

  const [products, setProducts] = useState();
  // const [cart, setCart]= useState([])
  // // console.log(cart);
  const { addToCart } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(` http://localhost:5000/products`);
        const data = await res.json();
        setAllProducts(data);
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

  // price sorting low to high
  const priceLowToHigh = () => {
    setProducts("");
    // setAllProducts("");
    fetch("http://localhost:5000/priceLow")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  // price sorting high to low
  const priceHighToLow = () => {
    setProducts("");
    // setAllProducts("");
    fetch("http://localhost:5000/priceHigh")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  //default Price
  const defaultPrice = () => {
    setProducts("");
    // setAllProducts("");
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
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
    setAllProducts("");
    const data = allProducts.filter((p) => p?.price > 0 && p?.price <= 100);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerTwo = () => {
    setProducts("");
    setAllProducts("");
    const data = allProducts.filter((p) => p?.price >= 100 && p?.price <= 200);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerThree = () => {
    setProducts("");
    setAllProducts("");
    const data = allProducts.filter((p) => p?.price >= 200 && p?.price <= 300);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerFour = () => {
    setProducts("");
    setAllProducts("");
    const data = allProducts.filter((p) => p?.price >= 300 && p?.price <= 400);
    setAllProducts(data);
    console.log(data);
  };

  const priceHandlerFive = () => {
    setProducts("");
    setAllProducts("");
    const data = allProducts.filter((p) => p?.price >= 400);
    setAllProducts(data);
    console.log(data);
  };

  // const addToCart = (name, id) => {
  //   const obj={
  //     name, id
  //   }
  //       setCart([...cart, obj])
  //       console.log('love', cart);
  // }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="my-7 relative">
      <div className="flex justify-center">
        <input
          onChange={handleSearch}
          className="border border-slate-400 outline-none rounded-md w-60 text-start px-3 py-1"
          placeholder="search product"
          type="text"
        />
      </div>

      <div className="flex flex-col absolute top-0 right-20">
        {/* <select
          className="border input-bordered px-2 py-1 text-sm rounded-sm outline-none font-semibold"
          name=""
          id=""
          onClick={sortingPrice}
        >
          <option className="font-semibold" value="" disabled selected>
            Price
          </option>
          <option className="font-semibold" value="">
            Default
          </option>
          <option className="font-semibold" value="">
            Low to High
          </option>
          <option className="font-semibold" value="">
            High to Low
          </option>
        </select> */}
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
          <input onClick={priceLowToHigh} type="radio" name="radio-5" id="" />
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

      <div className="flex pl-10 mt-10 pb-12">
        <div className="flex flex-col gap-3 w-36 mr-12">
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
        </div>
        <hr className="bg-slate-300 w-0.5 h-screen" />
        <div className="w-ful">
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:px-16 md:px-16 px-4 pb-20 lg:ml-0 md:ml-0 ml-6">
            {products
              ? products?.map((product) => (
                  <SingleProduct
                    key={product?._id}
                    product={product}
                    addToCart={addToCart}
                  ></SingleProduct>
                ))
              : allProducts &&
                allProducts?.map((product) => (
                  <SingleProduct
                    key={product?._id}
                    product={product}
                    // addToCart={addToCart}
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
