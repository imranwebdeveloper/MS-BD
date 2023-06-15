import React from "react";
import { PhoneVariants } from "types";
interface Props {
  prices: PhoneVariants[];
}

const CardPrice: React.FC<Props> = ({ prices }) => {
  let price = 0;
  prices.forEach((item) => {
    if (!price) {
      if (item.official) {
        price = item.official;
      } else {
        price = item.official;
      }
    }
  });
  return (
    <p className="text-sm text-center font-bold text-link-text-light">
      {price ? `${price} Tk` : "Coming Soon "}
    </p>
  );
};

export default CardPrice;
