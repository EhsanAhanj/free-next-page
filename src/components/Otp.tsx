"use client"; // This is a client component 👈🏽

import React, { useState } from "react";

const Otp = () => {
  const [code, setCode] = useState("****");

  return (
    <div className="flex text-4xl ">
      <h1>Code: </h1>
      <h1> {code} </h1>
    </div>
  );
};

export default Otp;
