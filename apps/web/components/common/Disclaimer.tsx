"use client";
import Link from "next/link";
import React from "react";

const Disclaimer = () => {
  return (
    <p className="md:text-center py-4">
      <small>
        <strong>Disclaimer: </strong>We do not guarantee that the information on
        our page is 100% accurate.
      </small>
      <Link href="/disclaimer" className="text-link-text-light px-1">
        <small>Read more</small>
      </Link>
    </p>
  );
};

export default Disclaimer;
