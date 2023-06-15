"use client";

// import { addInput, removeInput } from "@/redux/slices/mobileSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const VariantInput: React.FC<{ name: string }> = ({ name }) => {
  const [rom, setRom] = useState<number>(0);
  const [ram, setRam] = useState<number>(0);
  const dispatch = useDispatch();

  return (
    <div className="my-2 flex items-center justify-between gap-2">
      <label className="min-w-[90px] text-sm ">Variant</label>

      <div className="flex flex-1 items-center gap-2 ">
        <input
          name="rom"
          type="number"
          value={rom}
          className=" w-full rounded-md bg-slate-50 border p-2 outline-none "
          placeholder="ROM"
          onChange={(e) => setRom(parseInt(e.target.value))}
        />
        <input
          name="ram"
          value={ram}
          type="number"
          className="w-full rounded-md bg-slate-50 border p-2 outline-none"
          placeholder="RAM"
          onChange={(e) => setRam(parseInt(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-between gap-2 text-sm font-bold">
        <button
          className=" btn-green "
          // onClick={() => {
          //   dispatch(
          //     addInput({
          //       name,
          //       value: { rom, ram, official: 0, unofficial: 0 },
          //     })
          //   );
          //   setRom(0);
          //   setRam(0);
          // }}
        >
          Add
        </button>
        <button
          className=" btn-danger "
          // onClick={() => dispatch(removeInput(name))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default VariantInput;
