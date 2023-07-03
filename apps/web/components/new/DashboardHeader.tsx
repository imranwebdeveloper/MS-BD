"use client";

import { BsPersonCircle } from "react-icons/bs";

const DashboardHeader = () => {
  return (
    <header className="my-2 flex  items-center rounded-md bg-white p-4 shadow  ">
      <div className="flex flex-1 items-center gap-2">
        <div className="max-w-md">
          <div className="relative flex w-full items-center gap-2 overflow-hidden  ">
            <div className="grid h-full  place-items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full pr-2  text-gray-700 outline-none"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 "></div>
    </header>
  );
};

export default DashboardHeader;
