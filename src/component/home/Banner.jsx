import React, { useState } from "react";
import pic1 from "../../assets/bpic1.png";
import pic2 from "../../assets/bpic2.png";
import pic3 from "../../assets/bpic3.png";
import pic4 from "../../assets/bpic4.png";
import { RxDotFilled } from "react-icons/rx";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [pic1, pic2, pic4, pic3];
  
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='h-[530px] w-full m-auto relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className=' bg-cover h-full w-full duration-300'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={20} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={20} />
      </div>
      <div className='flex top-4 justify-center'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl text-slate-400 cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

