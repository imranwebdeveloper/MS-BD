"use client";

import { ReactNode, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const AsideCollapse: React.FC<{
  title: string;
  children: ReactNode;
  icon: ReactNode;
}> = ({ title, children, icon }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <li className="cursor-pointer transition duration-150 ease-in-out">
      <p
        className="mb-2 flex items-start gap-4"
        onClick={() => setToggle(!toggle)}
      >
        <span>{icon}</span> <span className="flex-1">{title} </span>
        <span>
          {toggle ? (
            <MdKeyboardArrowDown className="text-xl" />
          ) : (
            <MdKeyboardArrowRight className="text-xl" />
          )}
        </span>
      </p>
      {toggle && (
        <ul className=" ml-1 rounded bg-slate-100 p-4 ">{children}</ul>
      )}
    </li>
  );
};

export default AsideCollapse;
