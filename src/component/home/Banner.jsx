import React, { useState } from "react";
import pic1 from "../../assets/bpic1.png";
import pic2 from "../../assets/bpic2.png";
import pic3 from "../../assets/bpic3.png";
import pic4 from "../../assets/bpic4.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Banner = () => {

  const [curr, setCurr] = useState(0);
  const slides = [pic1, pic2, pic4, pic3];

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  return (
    <div className="relative">
    

      <div className="flex justify-between relative top-[270px]">
        <button onClick={prev} className="text-white z-50 btn btn-info">
          <FaAngleLeft></FaAngleLeft>
        </button>
        <button onClick={next} className="text-white z-50">
          <FaAngleRight></FaAngleRight>
        </button>
      </div>
    </div>
  );
};

export default Banner;
