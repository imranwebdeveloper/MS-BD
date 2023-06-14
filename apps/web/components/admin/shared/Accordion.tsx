"use client";

import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface AccordionProps {
  heading: string;
  children: JSX.Element;
  fn?: boolean;
  bg?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ heading, children, fn, bg }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <div
      className={`mb-1 rounded-md border ${
        bg ? "bg-[#F1F5F9]" : "bg-primary-bg-light"
      }  p-4 text-sm text-slate-800`}
    >
      <div
        className="col-span-2 flex cursor-pointer items-center justify-between "
        onClick={() => setToggle(!toggle)}
      >
        <h1 className={`${fn ? "" : "text-lg"} font-bold`}> {heading} </h1>
        <span className={`${fn ? "" : "text-lg"}`}>
          {toggle ? <FaMinusCircle /> : <FaPlusCircle />}
        </span>
      </div>
      <>{toggle && children}</>
    </div>
  );
};

export default Accordion;
