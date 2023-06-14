"use client";
import { BsSearch } from "react-icons/bs";
const Search = () => {
  return (
    <div className="flex-1 hidden  md:flex items-center bg-slate-100 border-2 px-4 py-[6px] rounded-3xl  gap-4 ">
      <input
        type="text"
        className="focus:outline-none bg-slate-100 flex-1   "
        placeholder="Find your phone here..."
      />
      <span className="md:text-lg  font-bold ">
        <BsSearch />
      </span>
    </div>
  );
};

export default Search;
