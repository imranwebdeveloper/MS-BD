"use client";

import { BsPersonCircle } from "react-icons/bs";
import Notifications from "./Notifications";
import SearchBox from "./SearchBox";

const DashboardHeader = () => {
  return (
    <header className="my-2 flex  items-center rounded-md bg-white p-4 shadow  ">
      <div className="flex flex-1 items-center gap-2">
        <SearchBox />
      </div>
      <div className="flex gap-2 ">
        <Notifications />
        <button className="hover-bg-secondary text-2xl">
          <BsPersonCircle />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
