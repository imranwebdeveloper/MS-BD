import { PhoneShortInfo, PhoneVariants } from "types";
import { useState, ChangeEvent } from "react";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useUpdateMobilePriceMutation } from "@/redux/api/adminApiSlice";

const UpdatePriceDialog = ({ mobile }: { mobile: PhoneShortInfo }) => {
  const [newPrice, setNewPrice] = useState<PhoneVariants[]>(mobile.variants);
  const [updateMobilePrice, mobilePriceState] = useUpdateMobilePriceMutation();

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const [variant, indexStr] = name.split("-");
    const index = parseInt(indexStr);

    setNewPrice((prevPrice) => {
      const newData = [...prevPrice];
      newData[index] = {
        ...newData[index],
        [variant]: +value,
      };
      return newData;
    });
  };

  const renderVariantInputs = () => {
    return mobile.variants.map((item: PhoneVariants, i: number) => {
      const { ROM, RAM, official, unofficial } = item;
      const officialInputName = `official-${i}`;
      const unofficialInputName = `unofficial-${i}`;

      return (
        <div key={i} className="flex gap-2">
          <p className="flex w-full items-center">{`${ROM}/${RAM} GB`}</p>
          <input
            type="number"
            name={officialInputName}
            className="w-full rounded-md border p-3 outline-none"
            placeholder="Official"
            defaultValue={official}
            onChange={handlePrice}
          />

          <input
            type="number"
            name={unofficialInputName}
            className="w-full rounded-md border p-3 outline-none"
            placeholder="Unofficial"
            defaultValue={unofficial}
            onChange={handlePrice}
          />
        </div>
      );
    });
  };

  return (
    <>
      {mobilePriceState.isSuccess ? (
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className={`text-green-600 w-16 h-16 mx-auto my-6`}
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Approved for available phone
            </h3>
          </div>
        </div>
      ) : (
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-center text-2xl font-semibold mb-4">
            {mobile.title}
          </h1>
          <div className="mb-2 grid grid-cols-3 bg-slate-50 py-2 font-bold">
            <p>Variant</p>
            <p>Official Price</p>
            <p>Unofficial Price</p>
          </div>
          {renderVariantInputs()}

          <DialogFooter>
            <Button
              onClick={async () => {
                await updateMobilePrice({
                  variants: newPrice,
                  id: mobile._id,
                  status: "AVAILABLE",
                });
              }}
              disabled={mobilePriceState.isLoading}
            >
              {mobilePriceState.isLoading ? "Please wait" : "Update"}
            </Button>
          </DialogFooter>
        </div>
      )}
    </>
  );
};

export default UpdatePriceDialog;
