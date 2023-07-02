"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApprovedMobileMutation } from "@/redux/api/adminApiSlice";
import { ChevronDown } from "lucide-react";
import { PhoneShortInfo } from "types";
import PriceUpdateForm from "./PriceUpdateForm";
import UpdatePriceDialog from "./UpdatePriceDialog";

interface Props {
  status: string;
  data: PhoneShortInfo;
}

const MobileAction: React.FC<Props> = ({ status, data }) => {
  const [approvedMobile, { isLoading }] = useApprovedMobileMutation();
  const approveHandler = () => {
    approvedMobile(data._id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Options <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {status === "UNAPPROVED" && (
            <DropdownMenuItem onClick={approveHandler}>
              Approve
            </DropdownMenuItem>
          )}
          <UpdatePriceDialog mobile={data} />
          {/* {status === "UPCOMING" && <UpdatePriceDialog />} */}
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileAction;
