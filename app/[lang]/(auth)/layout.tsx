import { cn } from "@/lib/utils";
import "./../globals.css";
import localFont from "next/font/local";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const iransans = localFont({
  src: [
    // {
    //   path: "../../../../public/fonts/IRANSansWeb.eot",
    //   weight: "400",
    // },
    {
      path: "../../../public/fonts/IRANSansWeb.ttf",
      weight: "800",
    },
    {
      path: "../../../public/fonts/IRANSansWeb.woff",
      weight: "700",
    },
    {
      path: "../../../public/fonts/IRANSansWeb.woff2",
      weight: "700",
    },
  ],
  variable: "--font-iransans",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("antialiased", iransans.className)}>
      <body className=" ">
        <div className=" flex flex-row bg-[#dae7fa]">
          <div className="flex flex-1"> </div>
          <div className="relative overflow-hidden  h-screen flex flex-[.8] bg-gradient-to-r from-[#007aff] to-[#0a79f7]  ">
            {/* circle */}
            <div className="absolute flex justify-center items-center z-10 -left-[200px] top-[30px] border-[#2d8ff0] h-[800px] w-[800px] border rounded-full">
              <div className=" z-10   border-[#0e82f3] h-[550px] w-[550px] border rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="shadow-lg flex border border-white/10 absolute lg:mx-36 sm:rounded-[55px] sm:my-20 bg-white/20 m-auto top-0 right-0 left-0 bottom-0">
          <div className="shadow-sm m-3 flex flex-row flex-1 max-h-max sm:rounded-[45px] bg-gradient-to-r from-[#065bbb] to-[#008dff]">
            <div className="flex z-40 lg:flex-[1.3] flex-[1.6] px-4 sm:rounded-r-[45px] m-0 justify-center items-center sm:rounded-l-[45px] shadow-sm bg-white">
              {children}
            </div>
            <div className="flex lg:flex-[.751] flex-[.3]  bg-transparent"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
