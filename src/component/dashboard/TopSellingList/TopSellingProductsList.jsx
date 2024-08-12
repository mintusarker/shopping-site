import React, { useEffect, useState } from "react";
import TopSell from "./TopSell";

const TopSellingProductsList = () => {
  const [topSell, setTopSell] = useState();
  console.log(topSell);

  useEffect(() => {
    fetch(`http://localhost:5000/top-selling`)
      .then((res) => res.json())
      .then((data) => setTopSell(data));
  }, []);
  
  return (
    <div>
       <h2 className="text-xl my-6 border-b-4 border border-green-900 text-center w-48 rounded-sm">
        Top Sell Items:  {topSell?.length}
      </h2>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 mt-7 pb-24">
        {topSell?.map((product) => (
          <TopSell
            key={product?._id}
            product={product}
          ></TopSell>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProductsList;
