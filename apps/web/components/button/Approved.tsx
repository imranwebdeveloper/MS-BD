"use client";

import { headers } from "@/lib/fetchHeader";
import React, { useState } from "react";
import Loading from "../admin/shared/Loading";

interface Props {
  id: string;
}

const Approved: React.FC<Props> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const makeApproved = async () => {
    setLoading(true);
    const res = await fetch(`${process.env["API_URL"]}/mobiles/approve/${id}`, {
      method: "PUT",
      headers: headers,
    });

    const data = await res.json();
    setLoading(false);
    console.log(data);
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        <Loading />
      ) : (
        <button className="btn-primary" onClick={makeApproved}>
          Approved
        </button>
      )}
    </div>
  );
};

export default Approved;
