import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        http-equiv="Permissions-Policy"
        content="interest-cohort=(), user-id=()"
      />
      <Script strategy="afterInteractive" id="otp">
        {`if ('OTPCredential' in window) {
        console.log("ALAHO AKBARRRRRRRRRRRRRRR11111111111111");
     
     window.addEventListener('DOMContentLoaded',function (e) {
        console.log("ALAHO AKBARRRRRRRRRRRRRRR");
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest('form');
        if (form) {
          form.addEventListener('submit', e => {
            ac.abort();
          });
        }
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(otp => {
          input.value = otp.code;
          if (form) form.submit();
        }).catch(err => {
          console.log(err);
        });
      });
    }`}
      </Script>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
