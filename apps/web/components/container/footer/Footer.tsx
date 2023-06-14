"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="root footer  ">
      <section className="layout container py-4">
        <ul className="flex justify-center items-center flex-wrap ">
          <li className="flex justify-center items-center px-2">
            <Link className="text-link-text-light" href="/">
              Home
            </Link>
          </li>
          <li className="flex justify-center items-center px-2">
            <Link className="text-link-text-light" href="/about">
              About
            </Link>
          </li>
          {/* <li className="flex justify-center items-center px-2">
            <Link className="text-link-text-light" href="/contact">
              Contact
            </Link>
          </li> */}
          <li className="flex justify-center items-center px-2">
            <Link className="text-link-text-light" href="/privacy">
              Privacy
            </Link>
          </li>
          <li className="flex justify-center items-center px-2">
            <Link className="text-link-text-light" href="/disclaimer">
              Disclaimer
            </Link>
          </li>
        </ul>
        <p className="text-center text-sm justify-center flex-wrap text-slate-500  flex gap-1 ">
          <span>{`© Copyright 2023-${new Date().getFullYear()} `}</span>
          <Link href="/" className="hover:text-link-text-light">
            {process.env.LOGO}
          </Link>
          {/* <span>| All Rights Reserved</span> */}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
