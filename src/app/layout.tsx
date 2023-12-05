/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/app-icon/icon-512x512.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/app-icon/icon-72x72.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/app-icon/icon-72x72.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      {/* <Script type="text/javascript" src="otp.js" /> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
