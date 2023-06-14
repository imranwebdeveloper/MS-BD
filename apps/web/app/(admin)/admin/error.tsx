"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="main">
      <section className="layout container flex justify-center items-center flex-col ">
        <h2 className="text-2xl font-bold mb-2 text-origin-500 ">
          {error.message}
        </h2>
        <button className="btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </section>
  );
}
