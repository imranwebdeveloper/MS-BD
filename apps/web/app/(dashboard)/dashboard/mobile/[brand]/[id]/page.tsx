"use client";
import Loading from "@/components/admin/shared/Loading";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PhoneContent from "@/components/common/PhoneContent";
import { capitalizeFirstWord } from "@/utils/toTitleCase";
import UpdatePriceDialog from "@/components/new/UpdatePriceDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteMobileByIdMutation,
  useGetMobileByIdQuery,
  useUpdateMobileStatusMutation,
} from "@/redux/api/adminApi";
import { useToast } from "@/components/ui/use-toast";

const MobileDetailsPage = () => {
  const params = useParams();
  const { toast } = useToast();

  const {
    isLoading,
    isError,
    data: phone,
    refetch,
  } = useGetMobileByIdQuery(params.id);

  const [deleteMobileById, deleteMobileState] = useDeleteMobileByIdMutation();
  const [updateMobileStatus, updateState] = useUpdateMobileStatusMutation();

  const [selectError, setSelectError] = useState("");

  const [onSelectValue, setOnSelectValue] = useState<string | null>(null);

  if (isLoading) {
    return <Loading />;
  } else if (phone) {
    const onApprovedHandler = async () => {
      if (onSelectValue) {
        await updateMobileStatus({
          id: phone._id,
          category: onSelectValue,
          status: "UPCOMING",
        });

        toast({
          title: " Success ",
          description: "Mobile status updated : Upcoming",
          variant: "default",
        });
        refetch();
      } else {
        setSelectError("Please select a category");
      }
    };
    return (
      <section className="layout container py-4">
        {deleteMobileState.isSuccess ? (
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className={` text-red-600 w-16 h-16 mx-auto my-6`}
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Mobile has been deleted
              </h3>
            </div>
          </div>
        ) : (
          <div>
            <article className="mx-auto ">
              <div className="border max-w-3xl mx-auto bg-white rounded-md  p-6">
                <div className="grid grid-cols-3 ">
                  <div className="col-span-1">
                    <Image
                      alt={`${phone.brand} ${phone.model} mobile`}
                      src={phone.img_url}
                      width={150}
                      height={180}
                      priority
                      className="max-w-[140px] max-h-40 mx-auto"
                    />
                  </div>
                  <div className="flex flex-col gap-4  items-start col-span-2">
                    <div className="flex gap-2 ">
                      <p className="font-bold text-lg">
                        {phone.brand} {phone.model}
                      </p>
                      <Badge
                        className={`${
                          phone.status !== "UNAPPROVED"
                            ? "text-green-600"
                            : "text-red-500"
                        } ml-2`}
                        variant="outline"
                      >
                        {phone.status}
                      </Badge>
                    </div>
                    {phone.status === "UNAPPROVED" && (
                      <div className="flex gap-2 items-center">
                        <Select
                          onValueChange={(value) => {
                            setOnSelectValue(value);
                            setSelectError("");
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="smartphone">
                                Smartphone
                              </SelectItem>
                              <SelectItem value="feature">
                                Feature Phone
                              </SelectItem>
                              <SelectItem value="tab">Tab</SelectItem>
                              <SelectItem value="watch">Watch</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Button
                          disabled={deleteMobileState.isLoading}
                          variant="destructive"
                          onClick={async () => {
                            await deleteMobileById(phone._id).unwrap();
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={onApprovedHandler}
                          disabled={updateState.isLoading}
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                    {selectError && (
                      <p className="text-red-600 text-sm">{selectError}</p>
                    )}
                  </div>
                </div>
              </div>
              {phone.status != "UNAPPROVED" && (
                <div className=" max-w-3xl mx-auto bg-white p-6 mt-4 border rounded-md ">
                  <UpdatePriceDialog mobile={phone} refetch={refetch} />
                </div>
              )}
            </article>
            <article className="max-w-3xl mx-auto   mt-2  ">
              {Object.keys(phone.content).map((section) => (
                <PhoneContent
                  key={section}
                  content={phone.content[section]}
                  title={capitalizeFirstWord(section.split("_").join(" "))}
                />
              ))}
            </article>
          </div>
        )}
      </section>
    );
  } else if (isError) {
    return <h1>Error</h1>;
  } else if (!phone) {
    return (
      <h1 className="text-2xl text-center mt-8 font-bold"> Opps! Not found</h1>
    );
  }
};

export default MobileDetailsPage;
