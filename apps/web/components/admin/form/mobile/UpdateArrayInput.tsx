"use client";
import React, { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import LoadingSmall from "../../shared/LoadingSmall";
import { useUpdateMobileContentMutation } from "@/redux/api/adminApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  id?: string;
  title: string;
  info: [string];
  fieldName: string;
  type?: string;
}

const UpdateArrayInput: React.FC<Props> = ({
  id,
  fieldName,
  info,
  title,
  type,
}) => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<object>();
  const [updateMobileContent, { isLoading }] = useUpdateMobileContentMutation();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value;
    const index = parseInt(e.target.name.split("-")[1]);
    const content = [...info];
    content[index] = value;
    setData({ [fieldName]: content });
  };

  const submitHandler = async () => {
    await updateMobileContent({ id, content: data });
    toast.success("Content updated");
    router.refresh();
  };

  return (
    <div className="flex  gap-2 border-b py-2">
      <p className="w-32 font-bold">{title} </p> :
      {toggle ? (
        <div className="w-full">
          {info.map((item, i) => {
            return (
              <input
                key={i}
                type={type ? type : "text"}
                name={`${fieldName}-${i}`}
                className="mb-1 w-full rounded-md border bg-slate-100 p-2 outline-none "
                defaultValue={item}
                onChange={(e) => inputHandler(e, i)}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full">
          {info.map((item, i) => {
            return (
              <p className="w-full p-2" key={i}>
                {item}
              </p>
            );
          })}
        </div>
      )}
      {isLoading ? (
        <LoadingSmall />
      ) : (
        <button
          className="rounded-full p-2 text-xl hover:bg-green-100"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <FiSave onClick={submitHandler} /> : <FiEdit />}
        </button>
      )}
    </div>
  );
};

export default UpdateArrayInput;
