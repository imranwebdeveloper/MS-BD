"use client";
import { useDeleteMobileMutation } from "@/redux/api/adminApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const MobileAction: React.FC<{ id: string }> = ({ id }) => {
  const [deleteMobile] = useDeleteMobileMutation();
  const router = useRouter();

  const deleteMobileHandler = async (id: string) => {
    await deleteMobile(id);
    toast.success("Mobile deleted successfully");
    router.refresh();
  };
  return (
    <div className="flex justify-center  text-xl">
      <Link
        href={`admin/mobiles/update/${id}`}
        className="rounded-full p-2 hover:bg-green hover:text-primary-bg-light"
      >
        <FiEdit />
      </Link>
      <button
        className="rounded-full p-2 hover:bg-waring hover:text-primary-bg-light"
        onClick={() => deleteMobileHandler(id)}
      >
        <BsTrash />
      </button>
    </div>
  );
};

export default MobileAction;
