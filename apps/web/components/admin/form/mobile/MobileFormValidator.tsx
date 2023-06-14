"use client";

import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Accordion from "../../shared/Accordion";

interface ValidatorProps {
  fullWidthContent?: any;
  twoColumnContent?: any;
  ArrayContent?: any;
}

const MobileFormValidator: React.FC<ValidatorProps> = ({
  fullWidthContent,
  twoColumnContent,
  ArrayContent,
}) => {
  return (
    <Accordion heading="View Details" fn bg>
      <div className="mt-4 grid grid-cols-2 gap-3 ">
        {twoColumnContent &&
          twoColumnContent.map((item: any, i: number) => {
            return (
              <div className="flex  gap-1 " key={i}>
                <div>
                  <p
                    className={` text-xl ${
                      item.content ? "text-green" : "text-waring"
                    } `}
                  >
                    {item.content ? (
                      <BsCheckCircle />
                    ) : (
                      <AiOutlineCloseCircle />
                    )}
                  </p>
                </div>

                <div className="flex  gap-1">
                  <p className="min-w-[100px]">{item.title} </p>:
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}

        {fullWidthContent &&
          fullWidthContent.map((item: any, i: number) => {
            return (
              <div className="col-span-2 flex items-center gap-1" key={i}>
                <span
                  className={` text-xl ${
                    item.content ? "text-green" : "text-waring"
                  } `}
                >
                  {item.content ? <BsCheckCircle /> : <AiOutlineCloseCircle />}
                </span>
                <div className="flex items-center gap-1">
                  <p className="min-w-[100px]">{item.title} </p>:
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}

        {ArrayContent &&
          ArrayContent.map((item: any, i: number) => {
            return (
              <div className="col-span-2 flex  gap-2" key={i}>
                <p className="flex min-w-[120px] items-center gap-1">
                  <span
                    className={` text-xl ${
                      item.content.length > 0 ? "text-green" : "text-waring"
                    } `}
                  >
                    {item.content.length > 0 ? (
                      <BsCheckCircle />
                    ) : (
                      <AiOutlineCloseCircle />
                    )}
                  </span>
                  <span>{item.title}</span>
                </p>
                :
                <div className="flex flex-col gap-2">
                  {item.content.map((content: any, index: number) => {
                    return (
                      <div key={index} className="flex ">
                        <strong>{`${index + 1} )`} </strong>
                        <span>{content}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </Accordion>
  );
};

export default MobileFormValidator;
