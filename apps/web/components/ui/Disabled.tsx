import React from "react";
import { Button } from "./button";
import { ReloadIcon } from "@radix-ui/react-icons";

const Disabled = () => {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin bg-white" />
      Please wait
    </Button>
  );
};

export default Disabled;
