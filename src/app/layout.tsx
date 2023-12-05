/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          key="viewport"
        />
        <meta name="theme-color" content="#ff7d85" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {/* <Script type="text/javascript" src="otp.js" /> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
