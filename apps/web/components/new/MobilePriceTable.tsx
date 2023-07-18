import React from "react";
import { PhoneVariants } from "types";

interface Props {
  variants: any;
  date: string;
}

const MobilePriceTable: React.FC<Props> = ({ variants, date }) => {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full border text-center text-xs md:text-sm  border-collapse ">
        <thead className="bg-origin-50  text-primary-bg-dark">
          <tr>
            <th className=" py-1  border">Variants</th>
            <th className=" py-1  border">Official</th>
            <th className=" py-1  border">Unofficial</th>
            <th className=" py-1  border-b  hidden md:block">Updated</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((item: PhoneVariants, i: number) => {
            return (
              <tr key={i}>
                <td className="whitespace-nowrap border py-1  ">
                  {item.RAM && `${item.RAM}/`}
                  {item.ROM >= 1000
                    ? `${item.ROM / 1000} TB`
                    : `${item.ROM} GB`}
                </td>
                <td className="whitespace-nowrap border py-1  ">
                  {item.official === 0 ? "-" : `${item.official} Tk`}
                </td>
                <td className="whitespace-nowrap border py-1  ">
                  {item.unofficial === 0 ? "-" : `${item.unofficial} Tk`}
                </td>

                {i === variants.length - 1 && (
                  <td className="whitespace-nowrap py-1   hidden md:table-cell">
                    {date}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MobilePriceTable;
