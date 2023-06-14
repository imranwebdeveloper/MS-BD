"use client";

import React, { useState } from "react";
// import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const UITheme = () => {
  // const { theme, setTheme } = useTheme();

  return (
    <div className="text-2xl df_jc_ic">
      {/* {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <MdOutlineLightMode />
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <MdOutlineDarkMode />
        </button>
      )} */}
    </div>
  );
};

export default UITheme;
