"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Variant } from "@/types/Variant";
import { useUpdateMobilePriceMutation } from "@/redux/api/adminApiSlice";
import { useRouter } from "next/navigation";
import { Mobile } from "@/types/mobile";
import LoadingSmall from "../../shared/LoadingSmall";

interface Props {
  mobile: any;
}

const PriceUpdateForm: React.FC<Props> = ({ mobile }) => {
  const [newPrice, setNewPrice] = useState<Variant[]>();
  // const [updateMobilePrice, { isLoading }] = useUpdateMobilePriceMutation();
  const router = useRouter();

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value;
    const index = parseInt(e.target.name.split("-")[1]);
    const variant = e.target.name.split("-")[0] as "official" | "unofficial";
    const newData = mobile.variant;
    newData[index][variant] = Number(price);
    setNewPrice(newData);
  };

  const submitHandler = async () => {
    try {
      if (newPrice) {
        // await updateMobilePrice({ id: mobile?._id, variant: newPrice });
        toast.success("New price updated");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-2 flex flex-col gap-2 rounded border bg-primary-bg-light p-8">
      <div className="mb-2 grid grid-cols-3 bg-slate-50 py-2 font-bold   ">
        <p>Variant</p>
        <p>Official Price</p> <p>Unofficial Price</p>
      </div>

      {mobile.variants.map((item: any, i: number) => {
        return (
          <div key={i} className="flex gap-2">
            <p className="flex w-full items-center">
              {item.ROM}/{item.RAM} GB
            </p>
            <input
              type="number"
              name={`official-${i}`}
              className=" w-full rounded-md border p-3 outline-none "
              placeholder="Official "
              defaultValue={item.official}
              onChange={handlePrice}
            />

            <input
              type="number"
              className=" w-full rounded-md border p-3 outline-none "
              placeholder="Unofficial"
              name={`unofficial-${i}`}
              defaultValue={item.unofficial}
              onChange={handlePrice}
            />
          </div>
        );
      })}

      <div className="mt-2 flex justify-center">
        <button
          type="button"
          className="btn-primary btn "
          onClick={submitHandler}
        >
          Update Price
        </button>
      </div>
    </div>
  );
};

export default PriceUpdateForm;
