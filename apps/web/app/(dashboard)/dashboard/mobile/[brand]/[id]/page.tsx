"use client";
import Loading from "@/components/admin/shared/Loading";
import { useGetMobileByIdQuery } from "@/redux/api/adminApiSlice";
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
import { useUpdateMobileStatusMutation } from "@/redux/api/adminApi";
import { useToast } from "@/components/ui/use-toast";

const MobileDetailsPage = () => {
  const params = useParams();

  const {
    isLoading,
    isError,
    data: phone,
    refetch,
  } = useGetMobileByIdQuery(params.id);
  const [updateMobileStatus, updateState] = useUpdateMobileStatusMutation();

  const [selectError, setSelectError] = useState("");
  const { toast } = useToast();

  const [onSelectValue, setOnSelectValue] = useState<string | null>(null);

  if (isLoading) {
    return <Loading />;
  } else if (phone) {
    const onApprovedHandler = async () => {
      if (onSelectValue) {
        updateMobileStatus({
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
                          <SelectItem value="smartphone">Smartphone</SelectItem>
                          <SelectItem value="feature">Feature Phone</SelectItem>
                          <SelectItem value="tab">Tab</SelectItem>
                          <SelectItem value="watch">Watch</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button variant="destructive">Delete</Button>
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
              <UpdatePriceDialog mobile={phone} />
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
      </section>
    );
  } else if (isError) {
    return <div>console.error();</div>;
  }
};

export default MobileDetailsPage;
