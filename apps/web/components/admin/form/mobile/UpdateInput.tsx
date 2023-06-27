"use client";

import { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import LoadingSmall from "../../shared/LoadingSmall";
// import { useUpdateMobileContentMutation } from "@/redux/api/adminApiSlice";
import { useRouter } from "next/navigation";

interface Props {
  id?: string;
  title?: string;
  info?: string;
  fieldName?: string;
  type?: string;
}

const UpdateInput: React.FC<Props> = ({ info, title, fieldName, id, type }) => {
  const router = useRouter();

  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<object>();
  // const [updateMobileContent, { isLoading }] = useUpdateMobileContentMutation();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ [name]: value });
  };

  const submitHandler = async () => {
    if (data) {
      // await updateMobileContent({ id, content: data });
      router.refresh();
    }
  };

  return (
    <div className="flex w-full items-center gap-2 border-b py-2">
      <p className="min-w-[100px] font-bold">{title} </p> :
      {toggle ? (
        <input
          type={type ? type : "text"}
          name={fieldName}
          className="w-full rounded-md border bg-slate-100 p-2 outline-none "
          defaultValue={info}
          onChange={inputHandler}
        />
      ) : (
        <p className="w-full p-2"> {info}</p>
      )}
      {/* {isLoading ? (
        <LoadingSmall />
      ) : (
        <button
          className="rounded-full p-2 text-xl hover:bg-green-100"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <FiSave onClick={submitHandler} /> : <FiEdit />}
        </button>
      )} */}
    </div>
  );
};

export default UpdateInput;
