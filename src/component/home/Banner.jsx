import React from "react";
import "./Banner.css";
import img3 from "../../assets/Banner.png";

const Banner = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${img3})`,
          backgroundSize: "cover",
          objectFit: 'fit',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
         
        }}
      >
        <div className="h-screen flex justify-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            className="text-center text-gray-200  bg-opacity-80 p-10 rounded"
          >
            <h2 className="text-4xl mb-3 p-3 uppercase leading-8">Welcome</h2>
            {/* <p className="text-lg">Leading the way in Medical Excellence</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
