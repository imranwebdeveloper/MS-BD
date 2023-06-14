import React from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

interface Props {
  content: any;
  title: string;
}

const PhoneContent: React.FC<Props> = ({ content, title }) => {
  const phoneInfo = Object.entries(content);

  return (
    <div className=" rounded-md bg-primary-bg-light mt-1 border text-xs md:text-sm tracking-tight  ">
      <p className="rounded-t-md p-2 md:py-2 md:px-6 text-sm md:text-base font-bold mb-1 bg-origin-50 text-origin-600">
        {title}
      </p>
      <ul className="divide-y p-2 md:py-4 md:px-6">
        {phoneInfo.map((item: any, i: number) => {
          // const yes = item[1]?.trim().toLowerCase() === "yes";
          // const no = item[1]?.trim().toLowerCase() === "no";
          return (
            <li key={i} className="flex md:leading-6  ">
              <p className=" min-w-[70px] md:min-w-[100px] font-bold py-1  ">
                {item[0]}
              </p>
              {/* {yes && (
                <BsCheckCircleFill className="text-xl bg-primary-bg-light text-[#8AC63C] mt-1 " />
              )}
              {no && (
                <BsXCircleFill className="text-xl  text-[#CA321C] bg-primary-bg-light mt+1 " />
              )} */}

              {/* {!yes && !no && ( */}
              <p
                className="flex-1 py-1"
                dangerouslySetInnerHTML={{
                  __html: item[1].replace(
                    /\n/g,
                    `<div class="border-b py-[2px]" ></div> `
                  ),
                }}
              ></p>
              {/* )} */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PhoneContent;
