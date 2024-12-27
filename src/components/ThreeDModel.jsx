import React from "react";
import Spline from "@splinetool/react-spline";

function ThreeDModel() {
  return (
    <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] mt-10 flex justify-center items-center md:mr-10 md:ml-0 ml-5 mr-5">
      {/* <Spline scene="https://prod.spline.design/ik7wd8BhZ9k-bfXt/scene.splinecode" /> */}
      {/* <Spline scene="https://prod.spline.design/P0jCpsk3EyP37Oae/scene.splinecode" /> */}
      <Spline scene="https://prod.spline.design/PihwGtu6ca7OgyLz/scene.splinecode" />
    </div>
  );
}

export default ThreeDModel;
