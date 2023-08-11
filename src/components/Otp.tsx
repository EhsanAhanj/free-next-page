"use client"; // This is a client component 👈🏽

import Script from "next/script";
import React, { useEffect, useState } from "react";

const Otp = () => {
  const [code, setCode] = useState("ccc");
  // useEffect(() => {
  //   const ac = new AbortController();
  //   console.log(navigator.credentials);

  //   (navigator.credentials as any).get({
  //     otp: { transport: ["sms"] },
  //     signal: ac.signal,
  //   });
  //   if (global?.window && "OTPCredential" in global?.window) {
  //     console.log("in OTPCredentials");

  //     {
  //       // global?.document.addEventListener("DOMContentLoaded", function (e) {
  //       console.log("IT IS LOAD??????????");

  //       console.log("WebOTP API is called");

  //       (navigator.credentials as any)
  //         .get({
  //           otp: { transport: ["sms"] },

  //           signal: ac?.signal,
  //         })
  //         .then((otp: any) => {
  //           console.log(otp);

  //           if (otp) {
  //             setCode(otp.code);
  //             ac.abort();

  //             console.log("submit() is called");
  //           }

  //           navigator?.credentials?.preventSilentAccess();
  //         })
  //         .catch((err: any) => {
  //           console.log("INJA OFTAD");

  //           console.log(err);
  //         });
  //       // });
  //     }
  //   }
  // }, []);
  // console.log((global.window as any)?.OTPCredential);

  // if (global.window) {
  //   if ("OTPCredential" in global.window) {
  //     global.window.addEventListener("DOMContentLoaded", (e) => {
  //       console.log("AAAAAAA");

  //       const input = global.document.querySelector(
  //         'input[autocomplete="one-time-code"]'
  //       ) as HTMLInputElement;
  //       if (!input) return;
  //       console.log("aftere aADSD");

  //       // Set up an AbortController to use with the OTP request
  //       const ac = new AbortController();
  //       const form = input.closest("form");
  //       if (form) {
  //         console.log("FORM");

  //         // Abort the OTP request if the user attempts to submit the form manually
  //         form.addEventListener("submit", (e) => {
  //           console.log("sob<sobbs");

  //           ac.abort();
  //         });
  //       }
  //       // Request the OTP via get()
  //       (navigator.credentials as any)
  //         .get({
  //           otp: { transport: ["sms"] },
  //           signal: ac.signal,
  //         })
  //         .then((otp: any) => {
  //           // When the OTP is received by the app client, enter it into the form
  //           // input and submit the form automatically
  //           input.value = otp.code;
  //           if (form) form.submit();
  //         })
  //         .catch((err: Error) => {
  //           console.error(err);
  //         });
  //     });
  //   }
  // }

  // useEffect(() => {
  //   if ("OTPCredential" in window) {
  //     console.log("ALAHO AKBARRRRRRRRRRRRRRR11111111111111");

  //     document.addEventListener("DOMContentLoaded", function (e) {
  //       console.log("ALAHO AKBARRRRRRRRRRRRRRR");
  //       const input = document.querySelector(
  //         'input[autocomplete="one-time-code"]'
  //       );
  //       console.log("1", input);
  //       if (!input) return;

  //       const ac = new AbortController();
  //       const form = input.closest("form");
  //       if (form) {
  //         form.addEventListener("submit", (e) => {
  //           ac.abort();
  //         });
  //       }
  //       navigator.credentials
  //         .get({
  //           otp: { transport: ["sms"] },
  //           signal: ac.signal,
  //         })
  //         .then((otp) => {
  //           console.log("OTP", otp);
  //           input.value = otp.code;
  //           if (form) form.submit();
  //         })
  //         .catch((err) => {
  //           console.log("AZZZZZZZZ ERRRPR");

  //           console.log(err);
  //         });
  //     });
  //   }
  // }, []);
  var dclhandler = false;
  if (global.document) {
    if (global.document.readyState !== "loading") {
      start();
    } else {
      dclhandler = true;
      global.document.addEventListener("DOMContentLoaded", start);
    }
  }
  function start() {
    if (global.document && dclhandler) {
      global.document.removeEventListener("DOMContentLoaded", start);
    }
    console.log("Start the site`s JS activities");
  }
  return (
    <div className="flex text-4xl flex-col w-full">
      <div className="flex w-full mb-3 px-5">
        <h1>Code: </h1>
        <h1> {code} </h1>
      </div>
      <form className="w-full px-2">
        <input
          autoComplete="one-time-code"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Otp;
