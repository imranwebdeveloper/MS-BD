"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

interface InputLabelProps {
  label: string;
  name: string;
}

const ArrayInput: React.FC<InputLabelProps> = ({ label, name }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleInput = () => {
    // dispatch(addInput({ name, value }));
    setValue("");
  };
  return (
    <div className="my-2 flex justify-between gap-2">
      <div className={`flex w-full items-center justify-between`}>
        <label className="min-w-[100px] text-sm ">{label}</label>
        <input
          name={name}
          type={"text"}
          value={value}
          className=" w-full rounded-md border bg-slate-50 p-2 outline-none "
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between gap-2 ">
        <button className="btn-green" onClick={handleInput}>
          Add
        </button>
        <button
          className=" btn-danger"
          // onClick={() => dispatch(removeInput(name))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ArrayInput;
