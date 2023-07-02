import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PhoneShortInfo, PhoneVariants } from "types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUpdateMobilePriceMutation } from "@/redux/api/adminApiSlice";

interface Props {
  mobile: PhoneShortInfo;
}

const UpdatePriceDialog: React.FC<Props> = ({ mobile }) => {
  const [newPrice, setNewPrice] = useState<PhoneVariants[]>(mobile.variants);
  const [updateMobilePrice, { isLoading }] = useUpdateMobilePriceMutation();
  const router = useRouter();

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = async () => {
    updateMobilePrice({ id: mobile._id, variants: newPrice });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link">Add Price</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="col-span-2 flex flex-col gap-2 ">
          <div className="mb-2 grid grid-cols-3 bg-slate-50 py-2 font-bold   ">
            <p>Variant</p>
            <p>Official Price</p> <p>Unofficial Price</p>
          </div>

          {mobile.variants.map((item: PhoneVariants, i: number) => {
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
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={submitHandler}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdatePriceDialog;
