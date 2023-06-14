import React from "react";
interface Props {
  error: any;
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <div className="flex justify-center">
      <h1 className="text-base font-bold text-red-400">{error.error}</h1>
    </div>
  );
};

export default Error;
