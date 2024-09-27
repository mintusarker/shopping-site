import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";

const TopSellingItems = () => {
  const { loading } = useContext(AuthContext);

  const [topSellItems, setTopSellItems] = useState();
  console.log(topSellItems);
  const [nextItems, setNextItems] = useState(8);

  const [noMoreQuantity, setNoMoreQuantity] = useState();
  console.log(noMoreQuantity);

  useEffect(() => {
    fetch(`http://localhost:5000/top-selling`)
      .then((res) => res.json())
      .then((data) => setTopSellItems(data));
  }, []);

  const loadMore = () => {
    if (nextItems < topSellItems?.length) {
      setNextItems((prev) => prev + 4);
    } else {
      setNoMoreQuantity("Explore More");
    }
  };

  // const seeLessProduct = () => {
  //   // setNextItems((prev) => prev - 3);
  //   // const items = nextItems - 3;
  //   // setNextItems(items)
  //   setNextItems(6);
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="mt-16 px-24">
      <h2 className="text-center font-semibold uppercase text-3xl leading-loose mb-6">
        Top Selling Items
      </h2>
      <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 w-full mx-auto">
        {topSellItems &&
          topSellItems?.slice(0, nextItems).map((topSell) => (
            <div
              key={topSell?._id}
              className="bg-base-100 rounded-sm shadow-md card relative"
            >
              <img src={topSell?.image} alt="Shoes" className="h-52 w-full" />
              <Link
                to={`top_selling/${topSell._id}`}
                className="absolute uppercase text-stone-700 btn px-7 rounded-sm bottom-10 right-14 text-xl"
              >
                Buy
              </Link>
            </div>
          ))}
      </div>

      {noMoreQuantity && (
        <div className="flex justify-center items-center">
          <Link
            to={"/shop"}
            className="text-center font-medium text-xl mt-8 uppercase border-2 border-orange-200 px-3 py-2"
          >
            {noMoreQuantity}
          </Link>
        </div>
      )}

      <div className="flex justify-end items-center">
        <button
          onClick={loadMore}
          className="btn btn-neutral btn-sm h-10 text-slate-200 uppercase text-sm font-semibold rounded-sm mt-4"
        >
          Load More
        </button>
        {/* {nextItems == topSellItems?.length ? (
          <button
            onClick={seeLessProduct}
            className="btn btn-md bg-black text-slate-200 hover:bg-gradient-to-t to-green-700 from-slate-900 uppercase rounded-sm mt-4"
          >
            See Less
          </button>
        ) : (
          <button
            onClick={loadMore}
            className="btn btn-md bg-black text-slate-200 hover:bg-gradient-to-t to-green-700 from-slate-900 uppercase rounded-sm mt-4"
          >
            Load More
          </button>
        )} */}
      </div>
    </div>
  );
};

export default TopSellingItems;
