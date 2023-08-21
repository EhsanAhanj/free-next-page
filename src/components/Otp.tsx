"use client"; // This is a client component 👈🏽

import Script from "next/script";
import React, { useEffect, useState } from "react";

const Otp = () => {
  const [code, setCode] = useState("cccc");
  useEffect(() => {
    const ac = new AbortController();
    console.log(navigator.credentials);

    (navigator.credentials as any).get({
      otp: { transport: ["sms"] },
      signal: ac.signal,
    });
    if (global?.window && "OTPCredential" in global?.window) {
      console.log("in OTPCredentials");

      {
        // global?.document.addEventListener("DOMContentLoaded", function (e) {
        console.log("IT IS LOAD??????????");

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
            console.log("INJA OFTAD");

            console.log(err);
          });
        // });
      }
    }
  }, [code]);
  // console.log((global.window as any)?.OTPCredential);

  // global.window.addEventListener("DOMContentLoaded", (e) => {
  //   console.log("AAAAAAAAAAAAA", e);

  //   const input = document.querySelector(
  //     'input[name="OTP-input"]'
  //   ) as HTMLInputElement;
  //   console.log("AAAAAAAAAAA", input);
  //   if (!input) return;
  //   const ac = new AbortController();
  //   const form = input.closest("form#primary_form");
  //   if (form) {
  //     form.addEventListener("submit", (e) => {
  //       ac.abort();
  //     });
  //   }
  //   (navigator.credentials as any)
  //     .get({
  //       otp: { transport: ["sms"] },
  //       signal: ac.signal,
  //     })
  //     .then((otp: any) => {
  //       input.value = otp.code;
  //       // submitForm();
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // });

  return (
    <div className="flex text-4xl flex-col w-full">
      <div className="flex w-full mb-3 px-5">
        <h1>Code: </h1>
        <h1> {code} </h1>
      </div>
      <form className="w-[200px] px-2" id="primary-form">
        <input
          autoComplete="one-time-code"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          id="primary_input"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Otp;
// code :9933

// @ehsanahanj.github.io #9933
