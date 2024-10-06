import React from "react";
import "./TopSellingBrand.css";

const TopSellingBrand = () => {
  return (
    <div className="pb-32 pt-10 border-t-2 border-slate-400 mt-20">
      <p className="text-center uppercase font-semibold text-2xl pb-14 -mt-6 mb-10">
        selling Brand
      </p>
      <div className="slider">
        <div className="slides-track">
          <div className="slide">Apex</div>
          <div className="slide">Bata</div>
          <div className="slide">Lotto</div>
          <div className="slide">Adiidas</div>
          <div className="slide">Puma</div>
          <div className="slide">Skechers</div>
          <div className="slide">Reebook</div>
          <div className="slide">Gucci</div>
          <div className="slide">Vans</div>
          <div className="slide">Woodland</div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingBrand;
