import React from "react";
import WrapButton from "../ui/wrap-button";

const Hero = () => {
  return (
    <div className="flex items-center px-4 md:px-20 w-full">
      <div className="w-[100%]">
        <h2 className="text-[5.7vh] leading-tight mb-6 ml-1">
          Your Safe Space for <br />
          <span className="font-bold">Mental Wellness</span> <br />
          and Healing
        </h2>
        <p className="text-gray-600 text-[19px] mb-8">
          Alura gives you a safe space to share, reflect, and heal. <br />
          Express yourself freely and find comfort in a community that truly cares.
        </p>
        <WrapButton />
      </div>
    </div>
  );
};

export default Hero;
