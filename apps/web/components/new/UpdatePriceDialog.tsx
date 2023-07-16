import { PhoneShortInfo, PhoneVariants } from "types";
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { useUpdateMobilePriceMutation } from "@/redux/api/adminApi";

const UpdatePriceDialog = ({
  mobile,
  refetch,
}: {
  mobile: PhoneShortInfo;
  refetch: () => void;
}) => {
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
        <div key={i} className="flex gap-1">
          <p className="flex w-full items-center">{`${ROM}/${RAM} GB`}</p>
          <input
            type="number"
            name={officialInputName}
            className="w-full rounded-md border p-1 outline-none"
            placeholder="Official"
            defaultValue={official}
            onChange={handlePrice}
          />

          <input
            type="number"
            name={unofficialInputName}
            className="w-full rounded-md border p-1 outline-none"
            placeholder="Unofficial"
            defaultValue={unofficial}
            onChange={handlePrice}
          />
        </div>
      );
    });
  };

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="mb-2 grid grid-cols-3 bg-slate-50 p-1 font-bold">
        <p>Variant</p>
        <p>Official Price</p>
        <p>Unofficial Price</p>
      </div>
      {renderVariantInputs()}

      <div className="mt-4 flex justify-end">
        <Button
          onClick={async () => {
            await updateMobilePrice({
              variants: newPrice,
              id: mobile._id,
              status: "AVAILABLE",
            });
            refetch();
          }}
          disabled={mobilePriceState.isLoading}
        >
          {mobilePriceState.isLoading ? "Please wait" : "Update price"}
        </Button>
      </div>
    </div>
  );
};

export default UpdatePriceDialog;
