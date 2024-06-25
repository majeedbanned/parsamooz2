"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StoreProps } from "@/lib/types";
import { DataTableColumnHeader } from "../../stores/components/data-table-column-header";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { Ownerschema } from "@/lib/schemas";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BanknotesIcon,
  Cog6ToothIcon,
  DocumentIcon,
  PaperClipIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Mail, MessageSquare, UserPlus } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { removeMathJaxHTMLContent } from "@/lib/utils";
export const columns: ColumnDef<any>[] = [
  // {
  //   accessorKey: "Doc_files",
  //   id: "doc",
  //   cell: ({ row }) => {
  //     const ttype = row.getValue("doc") as { Doc_cat: { title: string } }[];
  //     // console.log(ttype);
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             {/* <span className="sr-only">Open menu</span> */}
  //             <PaperClipIcon className="h-5 w-5" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent className="bordercolor" align="end">
  //           <DropdownMenuSub>
  //             <DropdownMenuSubTrigger>
  //               <PlusCircleIcon className="mr-2 h-4 w-4" />
  //               <span>افزودن سند</span>
  //             </DropdownMenuSubTrigger>
  //             <DropdownMenuPortal>
  //               <DropdownMenuSubContent className="left-[45px] ">
  //                 <DropdownMenuItem>
  //                   <Mail className="mr-2 h-4 w-4" />
  //                   <span>jhg</span>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem>
  //                   <MessageSquare className="mr-2 h-4 w-4" />
  //                   <span>Message</span>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem>
  //                   <PlusCircle className="mr-2 h-4 w-4" />
  //                   <span>More...</span>
  //                 </DropdownMenuItem>
  //               </DropdownMenuSubContent>
  //             </DropdownMenuPortal>
  //           </DropdownMenuSub>
  //           <DropdownMenuSeparator />

  //           {ttype.map((type, index) => {
  //             return (
  //               <DropdownMenuItem
  //                 key={index}
  //                 className="flex justify-end gap-2"
  //                 // onClick={() => onChargeClick(row.original)}
  //               >
  //                 {type.Doc_cat.title}
  //                 <DocumentIcon className="w-4 h-4"></DocumentIcon>
  //               </DropdownMenuItem>
  //             );
  //           })}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },

  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="پلاک" />
  //   ),
  // },
  {
    accessorKey: "id",
    id: "کد",
    cell: ({ row }) => {
      return (
        <Badge className="rounded-lg bordercolor font-bold" variant="outline">
          {row.getValue("کد")}
        </Badge>
      );
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="کد" />
    ),
  },

  {
    accessorKey: "cat1",
    id: "cat1",
    cell: ({ row }) => {
      return (
        <Badge className="rounded-sm" variant="secondary">
          {row.getValue("cat1")}
        </Badge>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="cat1" />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "g1",
    id: "g1",
    cell: ({ row }) => {
      return <div></div>;
    },
    // header: ({ column }) => {
    //   return <DataTableColumnHeader column={column} title="g1" />;
    // },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    accessorKey: "g2",
    id: "g2",
    cell: ({ row }) => {
      return <div></div>;
    },
    // header: ({ column }) => {
    //   return <DataTableColumnHeader column={column} title="g1" />;
    // },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },

  {
    accessorKey: "g3",
    id: "g3",
    cell: ({ row }) => {
      return <div></div>;
    },
  },

  {
    accessorKey: "g4",
    id: "g4",
    cell: ({ row }) => {
      return <div></div>;
    },
  },

  {
    accessorKey: "soal",
    id: "soal",
    cell: ({ row }) => {
      return (
        // <div className="rounded-sm" variant="secondary">
        <MathJax>
          <div className="flex flex-col gap-2">
            <div style={{ textAlign: "right" }}>
              <div
                className="font-bold"
                style={{ direction: "ltr" }}
                dangerouslySetInnerHTML={{
                  __html: removeMathJaxHTMLContent(row.getValue("soal")),
                }}
              ></div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2  ">
              <div className="border rounded-lg p-2 flex flex-1 justify-center items-center ">
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ direction: "ltr" }}
                    dangerouslySetInnerHTML={{
                      __html: removeMathJaxHTMLContent(row.getValue("g1")),
                    }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-2 flex flex-1 justify-center items-center">
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ direction: "ltr" }}
                    dangerouslySetInnerHTML={{
                      __html: removeMathJaxHTMLContent(row.getValue("g2")),
                    }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-2 flex flex-1 justify-center items-center">
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ direction: "ltr" }}
                    dangerouslySetInnerHTML={{
                      __html: removeMathJaxHTMLContent(row.getValue("g3")),
                    }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-2 flex flex-1 justify-center items-center">
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ direction: "ltr" }}
                    dangerouslySetInnerHTML={{
                      __html: removeMathJaxHTMLContent(row.getValue("g4")),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </MathJax>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="cat1" />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  //   {
  //     accessorKey: "tlname",
  //     id: "فامیل",

  //     cell: ({ row }) => {
  //       return (
  //         <div className="text-slate-600 font-medium">
  //           {row.getValue("فامیل")}
  //         </div>
  //       );
  //     },
  //     header: ({ column }) => {
  //       return <DataTableColumnHeader column={column} title="فامیل" />;
  //     },
  //   },
  //   {
  //     accessorKey: "tmeli",
  //     id: "ملی",
  //     cell: ({ row }) => {
  //       return (
  //         <Badge className="rounded-sm" variant="secondary">
  //           {row.getValue("ملی")}
  //         </Badge>
  //       );
  //     },
  //     header: ({ column }) => {
  //       return <DataTableColumnHeader column={column} title="کد ملی" />;
  //     },
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },

  //   {
  //     accessorKey: "tmobile",
  //     id: "موبایل",

  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="موبایل" />
  //     ),
  //   },

  //   {
  //     accessorKey: "ttel",
  //     id: "تلفن",
  //     cell: ({ row }) => {
  //       return (
  //         <Badge className="rounded-sm" variant="secondary">
  //           {row.getValue("تلفن")}
  //         </Badge>
  //       );
  //     },
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="تلفن" />
  //     ),
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },

  //   {
  //     accessorKey: "changeOwner",
  //     id: "تاریخ",
  //     cell: ({ row }) => {
  //       return (
  //         <Badge className="rounded-sm" variant="secondary">
  //           {row.getValue("تاریخ")}
  //         </Badge>
  //       );
  //     },
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="تاریخ انتقال سرقفلی" />
  //     ),
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },
  //
];
