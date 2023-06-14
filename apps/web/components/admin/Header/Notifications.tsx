"use client";

import React, { useState } from "react";
import { MdOutlineNotifications } from "react-icons/md";

const Notifications = () => {
  const [active, setActive] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  return (
    <div className="relative">
      <span
        className={`text-3xl hover-bg-secondary relative ${
          active && "bg-slate-200"
        }`}
        onClick={() => {
          setActive(!active);
          setNewNotification(true);
        }}
      >
        <MdOutlineNotifications />
        {!newNotification && (
          <span className="absolute text-xs rounded-full  bg-red-500 p-1 top-1 right-[9px]  text-white" />
        )}
      </span>
      {active && (
        <ul className="w-72  absolute top-12 right-4 shadow-2xl  rounded overflow-hidden  bg-white  ">
          <h3 className="font-semibold text-xl p-4">Notifications</h3>
          <li className="px-4 py-2 cursor-pointer hover:bg-green-50">
            <p className=" text-sm font-semibold">
              A new commented on Samsung S2
            </p>
            <p className="text-xs text-slate-700">
              Ratul Islam comment to ...{" "}
            </p>
            <time className="text-xs text-zinc-600">7.20 pm</time>
          </li>
          <li className="px-4 py-2 cursor-pointer hover:bg-green-50">
            <p className=" text-sm font-semibold">A new commented on Poco X2</p>
            <p className="text-xs text-slate-700">Nazir comment to ... </p>
            <time className="text-xs text-zinc-600">11.31 am</time>
          </li>
          <li className="px-4 py-2 cursor-pointer hover:bg-green-50">
            <p className=" text-sm font-semibold"> A new like on Apple 11</p>
            <time className="text-xs text-zinc-600">4.17 pm</time>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Notifications;
