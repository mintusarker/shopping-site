import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";
import { AuthContext } from "../../auth/AuthProvider";

const Shopping = () => {
  const [allProducts, setAllProducts] = useState();

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
          console.log(data);
        });
    } else {
      fetch(` http://localhost:5000/products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          console.log(data);
        });
    }
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
    <div className="my-7">
      <div className="flex justify-center">
        <input
          onChange={handleSearch}
          className="border border-slate-400 outline-none rounded-md w-60 text-start px-3 py-1"
          placeholder="search product"
          type="text"
        />
      </div>
      <div className="flex px-12 mt-10">
        <div className="flex flex-col gap-3 w-32">
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
        </div>
        <div className="w-full">
          <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 px-20 pb-20">
            {products
              ? products?.map((product) => (
                  <SingleProduct
                    key={product?._id}
                    product={product}
                    addToCart={addToCart}
                  ></SingleProduct>
                ))
              : allProducts?.map((product) => (
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
