import React from "react";

const LoadingPage = () => {
  return (
    <div className="layout mt-4 flex justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600  border-r-white align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingPage;
