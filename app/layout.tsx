
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Signinprovider } from "@/context/firebase";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Financial nexus",
  description: "AI powered financial dashboard application",
};
import { ToastContainer } from 'react-toastify';
import DashBoardState from "@/context/dashboard";
import ChatWidget from "@/components/chatwidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Signinprovider>
          <DashBoardState>

        <ToastContainer/>

          {children}
          </DashBoardState>
        </Signinprovider>

      </body>
    </html>
  );
}
