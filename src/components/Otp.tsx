"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from "react";

const Otp = () => {
  const [code, setCode] = useState("****");

  useEffect(() => {
    if (global?.window && "OTPCredential" in global?.window) {
      console.log("in OTPCredentials");

      global?.window.addEventListener("DOMContentLoaded", (e) => {
        const ac = new AbortController();

        console.log("WebOTP API is called");

        (navigator.credentials as any)
          .get({
            otp: { transport: ["sms"] },

            signal: ac?.signal,
          })
          .then((otp: any) => {
            console.log(otp);

            if (otp) {
              setCode(otp.code);
              ac.abort();

              console.log("submit() is called");
            }

            navigator?.credentials?.preventSilentAccess();
          })
          .catch((err: any) => {
            console.log(err);
          });
      });
    }
  }, [global?.window]);
  return (
    <div className="flex text-4xl ">
      <h1>Code: </h1>
      <h1> {code} </h1>
    </div>
  );
};

export default Otp;
