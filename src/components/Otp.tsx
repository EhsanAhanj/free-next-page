import React, { useEffect, useState } from "react";

const Otp = () => {
  const [code, setCode] = useState("vvvvvv");
  useEffect(() => {
    const ac = new AbortController();
    console.log(navigator.credentials, "1");

    navigator?.credentials &&
      (navigator.credentials as any)
        .get({
          otp: { transport: ["sms"] },

          signal: ac?.signal,
        })
        .then((otp: any) => {
          console.log(otp);
          if (otp) {
            console.log("RESIIIIIIIIIIIIIIIIFFFFFFFFFFFFFFFFFFFFFF");

            // helper.setValue(otp?.code, true);
            // helper.setTouched(true);
            // submitForm();
            ac.abort();

            console.log("submit() is called");
          }

          // navigator?.credentials?.preventSilentAccess();
        })
        .catch((err: any) => {
          ac.abort();
          console.log(err);
        });

    // return () => {
    //     console.log('otp aborting');
    //     navigator?.credentials?.preventSilentAccess();
    //     ac.abort();
    // };
  }, []);

  return (
    <div className="flex text-4xl flex-col w-full max-w-[80vw]">
      <div className="flex w-full mb-3 px-5">
        <h1>Code: </h1>
        <h1> {code} </h1>
      </div>
      <form className="w-full px-2" id="primary-form">
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
