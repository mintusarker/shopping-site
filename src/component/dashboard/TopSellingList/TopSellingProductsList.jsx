import React, { useEffect, useState } from "react";
import TopSell from "./TopSell";
import toast from "react-hot-toast";

const TopSellingProductsList = () => {
  const [topSells, setTopSells] = useState();
  console.log(topSells);

  useEffect(() => {
    fetch(`user-dashboard-server-five.vercel.app/top-selling`)
      .then((res) => res.json())
      .then((data) => setTopSells(data));
  }, []);

  //remove
  const handleRemoveTopSell = (_id) => {
    fetch(`user-dashboard-server-five.vercel.app/top-selling/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const restTopSell = topSells.filter((topSell) => topSell?._id !== _id);
        console.log(restTopSell?.length);
        setTopSells(restTopSell);
        if (data.deletedCount > 0) {
          toast.success("Top selling product removed");
        }
      });
  };

  return (
    <div className="px-12">
      <h2 className="text-xl leading-6 my-6 border-b-4 border border-green-900 text-center w-44 rounded-sm">
        Top Sell Items: {topSells?.length}
      </h2>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-7 pb-24">
        {topSells?.map((product) => (
          <TopSell
            key={product?._id}
            product={product}
            handleRemoveTopSell={handleRemoveTopSell}
          ></TopSell>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProductsList;
