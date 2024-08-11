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

  const handleRemove =()=> {

  }
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-16 mt-7 pb-24">
        {topSell?.map((product) => (
          <TopSell
            key={product?._id}
            product={product}
            // newArrivalDelete={newArrivalDelete}
          ></TopSell>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProductsList;
