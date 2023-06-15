import React from "react";
import { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
// import { useUpdateMobileContentMutation } from "@/redux/api/adminApiSlice";
import LoadingSmall from "../../shared/LoadingSmall";

interface Props {
  id: string;
  title: string;
  info: string;
  fieldName: string;
  type?: string;
}

const UpdateDate: React.FC<Props> = ({ id, fieldName, info, title, type }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<object>();
  // const [updateMobileContent, { isLoading }] = useUpdateMobileContentMutation();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ [name]: value });
  };

  // const submitHandler = () => updateMobileContent({ id, content: data });

  return (
    <div className="flex items-center gap-2 border-b py-2">
      <p className="w-32 font-bold">{title} </p>
      {toggle ? (
        <input
          type="date"
          name={fieldName}
          className="w-full rounded-md border bg-slate-50 p-2 outline-none "
          defaultValue={info}
          onChange={inputHandler}
        />
      ) : (
        <p className="w-full p-2">: {info}</p>
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

export default UpdateDate;
