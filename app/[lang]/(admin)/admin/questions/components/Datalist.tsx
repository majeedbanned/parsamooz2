"use client";
import { columns } from "@/app/[lang]/(admin)/admin/questions/components/columns";
import { DataTable } from "@/app/[lang]/(admin)/admin/stores/components/data-table";
import { Button } from "@/components/ui/button";
import { encodeObjectToHashedQueryString, fetcher } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { fetchQueryResult } from "../../../../../actions/queryAction";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { ToggleGroupItem } from "@/components/ui/toggle-group";

import useAddEditOwnerModal from "@/app/[lang]/components/modals/AddEditOwnerModal";
import useDeleteOwnerModal from "@/app/[lang]/components/modals/DeleteOwnerModal";
import { z } from "zod";
import { Ownerschema } from "@/lib/schemas";
import { toast } from "sonner";
import { rejects } from "assert";
import { Globe2Icon, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
import { AddEditOwnerModal } from "@/app/[lang]/components/modals/AddEditOwnerModal";
import { DeleteOwnerModal } from "@/app/[lang]/components/modals/DeleteOwnerModal";
import useTwainModal, {
  TwainModal,
} from "@/app/[lang]/components/modals/TwainModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { FacetedFilter } from "../../stores/components/faceted-filter";

type Props = {};

export default function Datalist({
  permission,
}: {
  permission?: Session | null;
}) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [editowner, setEditowner] = useState<z.infer<typeof Ownerschema>>();
  const [deleteID, setDeleteID] = useState<string>("");
  const [delLable1, setDelLable1] = useState<string>("");
  const [delLable2, setDelLable2] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const AddUserModal = useAddEditOwnerModal();
  const _DeleteOwnerModal = useDeleteOwnerModal();
  const _TwainModal = useTwainModal();
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState("10");
  const [cat1, setCat1] = React.useState([]);
  const [cat2, setCat2] = React.useState([]);
  const [cat3, setCat3] = React.useState([]);
  const [cat4, setCat4] = React.useState([]);

  const [dificulty, setDificulty] = React.useState<string[]>([]);
  const [qtype, setQtype] = React.useState<string[]>([]);

  const [cat1Val, setCat1Val] = React.useState("");
  const [cat2Val, setCat2Val] = React.useState("");
  const [cat3Val, setCat3Val] = React.useState("");
  const [cat4Val, setCat4Val] = React.useState("");

  useEffect(() => {
    async function fetchData() {
      // const res = await fetch("api/questions");
      // const data = await res.json();
      // console.log("data", data);
      // setData(data);
      let maghta = "";
      if (value !== "") maghta = " maghta=" + value;
      let cat1_ = "";
      if (cat1Val !== "") cat1_ = ` and  cat1=N'${cat1Val}' `;

      let cat2_ = "";
      if (cat2Val !== "") cat2_ = ` and  cat2=N'${cat2Val}' `;

      let cat3_ = "";
      if (cat3Val !== "") cat3_ = ` and  cat3=N'${cat3Val}' `;

      let _diff = "";
      if (dificulty.length !== 0)
        _diff = ` and  daraje in (${dificulty
          .map((item) => `N' ${item} '`)
          .join(",")}) `;

      let _qtype = "";
      if (qtype.length !== 0)
        _qtype = ` and  noe in (${qtype
          .map((item) => `N' ${item} '`)
          .join(",")}) `;

      console.log(
        `SELECT top 40 * FROM q where ${maghta} ${cat1_} ${cat2_} ${cat3_} ${_diff} ${_qtype}`
      );

      const result = await fetchQueryResult(
        `SELECT top 40 * FROM q where ${maghta} ${cat1_}${cat2_} ${cat3_} ${_diff} ${_qtype}`
      );
      console.log(result);
      setData(result);
    }
    fetchData();
  }, [value, cat1Val, cat2Val, cat3Val, dificulty, qtype]);

  useEffect(() => {
    async function fetchCat1() {
      const result = await fetchQueryResult(
        `select distinct cat1 from z where maghta = ${value}`
      );
      setCat1(result);
    }
    fetchCat1();
  }, [value]);

  useEffect(() => {
    async function fetchCat2() {
      const result = await fetchQueryResult(
        `select distinct cat2 from z where maghta = ${value}  and cat1=N'${cat1Val}'`
      );
      setCat2(result);
    }
    fetchCat2();
  }, [cat1Val]);

  useEffect(() => {
    async function fetchCat3() {
      const result = await fetchQueryResult(
        `select distinct cat3 from z where maghta = ${value}  and cat1=N'${cat1Val}'  and cat2=N'${cat2Val}'`
      );
      setCat3(result);
    }
    fetchCat3();
  }, [cat2Val]);

  useEffect(() => {
    async function fetchCat4() {
      const result = await fetchQueryResult(
        `select distinct cat4 from z where maghta = ${value}  and cat1=N'${cat1Val}'  and cat2=N'${cat2Val}' and cat3=N'${cat3Val}'`
      );
      setCat4(result);
    }
    fetchCat4();
  }, [cat3Val]);

  const handleFetchData = async () => {
    try {
      const result = await fetchQueryResult("select top 10 * from z");
      console.log("result0", result);

      // setData(result);
      // setError(null);
    } catch (err) {
      // setError('Error fetching data');
      // setData(null);
    }
  };

  let per = permission?.user?.Permission?.find((item) => {
    return item.systemID === 4 && item.edit === true;
  });
  let canAction = { ...per };
  // console.log("canAction", canAction);

  if (permission?.user.role === "admin") {
    canAction = {
      ...per,
      add: true,
      edit: true,
      print: true,
      view: true,
      docedit: true,
      docadd: true,
      docview: true,
    };
  }

  //const pelak = searchParams.get("pelak")?.toUpperCase();
  const pelak = useParams();
  // console.log(pelak?.pelak);
  const AddRecord = () => {
    setEditowner({
      taddress: "",
      tfather: "",
      tfname: "",
      tjob: "",
      tlname: "",
      tmeli: "",
      tmobile: "",
      ttel: "",
      sex: "",
      cposti: "",
      pelak: pelak ? pelak?.pelak.toString() : "",
      trow: 0,
    });

    setTimeout(() => {
      AddUserModal.onOpen("");
    }, 100);
  };

  //${searchParams ? `?${searchParams.toString()}
  const {
    data: owner,
    isLoading,
    mutate,
  } = useSWR<z.infer<typeof Ownerschema>[]>(
    `/api/questions?pelak=${pelak ? `${pelak?.pelak.toString()}` : ""}${
      searchParams ? `&${searchParams}` : ``
    } `,
    fetcher,
    {
      // revalidateOnMount: true,
    }
  );
  const mathJaxConfig = {};

  //console.log(owner);
  // ${
  //   searchParams ? `&search=${searchParams}` : ``
  const handleDeleteClick = (rowData: any) => {
    const promise = () =>
      new Promise((resolve) => {
        setDeleteID(rowData.trow);
        setDelLable1(`پلاک : ${rowData.pelak}`);
        setDelLable2(rowData.tlname + " " + rowData.tfname);
        setTimeout(() => {
          _DeleteOwnerModal.onOpen(rowData.trow);
          resolve("");
        }, 100);
      });

    toast.promise(promise, {
      loading: "حذف اطلاعات  ...",
      success: (data) => {
        toast.dismiss();
        return `${data} `;
      },
      error: "Error",
    });
  };

  const handlePrintClick = (rowData: any) => {};

  const handleNewFileClick = (rowData: any, id: any) => {
    const newdata = rowData.list?.find((doc: any) => doc.id === id) ?? {};
    console.log(rowData);
    const myObject = {
      moduleID: newdata.moduleId,
      CatID: newdata.id,
      name: `file_${uuidv4()}.pdf`, // Generate a unique file name with a GUID
      date_: new Date().toISOString(), // Set to the current date and time
      userID: 1,
      pelak: rowData.pelak,
      rowId: rowData.trow,
      mode: "add",
      per: canAction.docedit,
    };

    const hashedQueryString = encodeObjectToHashedQueryString(myObject);
    const filedata = { ...rowData, hash: hashedQueryString };
    console.log(filedata);
    console.log(myObject);
    console.log("encode", hashedQueryString);
    console.log(decodeURIComponent(hashedQueryString));

    // return;
    setTimeout(() => {
      _TwainModal.onOpen(filedata);
      // resolve("");
    }, 100);
  };

  const handlesetQtype = (type: string, e: string[]) => {
    setQtype(e);
  };

  const handlesetdifficulty = (type: string, e: string[]) => {
    setDificulty(e);
  };

  const handleFileClick = (rowData: any, id: any) => {
    const newdata = rowData.Doc_files?.find((doc: any) => doc.id === id) ?? {};
    const myObject = {
      moduleID: newdata.moduleId,
      CatID: newdata.CatID,
      name: newdata.name,
      date_: newdata.date_,
      userID: 1,
      pelak: newdata.pelak,
      rowId: newdata.rowId,
      mode: "edit",
      per: canAction.docedit,
    };

    const hashedQueryString = encodeObjectToHashedQueryString(myObject);
    const filedata = { ...rowData, hash: hashedQueryString };
    console.log(filedata);
    // return;
    setTimeout(() => {
      _TwainModal.onOpen(filedata);
      // resolve("");
    }, 100);
  };
  const handleActionClick = (rowData: any) => {
    const promise = () =>
      new Promise((resolve) => {
        fetch("/api/owner/" + (rowData.trow !== "" ? rowData.trow : "1")).then(
          async (res) => {
            if (res.status === 200) {
              const val = await res.json();
              setEditowner(val);
              setTimeout(() => {
                AddUserModal.onOpen(rowData.trow);
                resolve("");
              }, 100);
            } else {
              const error = await res.text();
              toast.error(error);
              rejects;
            }
          }
        );
      });
    toast.promise(promise, {
      loading: "دریافت اطلاعات ...",
      success: (data) => {
        toast.dismiss();
        return `${data} `;
      },
      error: "Error",
    });
  };

  const [selected, setSelected] = useState([]);

  const handleToggle = (value: any) => {
    setSelected((prev: any) => {
      if (prev.includes(value)) {
        return prev.filter((item: any) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  //console.log(owner);
  return (
    <div>
      {/* <TwainModal mutation={mutate}></TwainModal> */}
      <DeleteOwnerModal
        mutation={mutate}
        data={deleteID}
        delLabel1={delLable1}
        delLabel2={delLable2}
      ></DeleteOwnerModal>
      <AddEditOwnerModal mutation={mutate} data={editowner}></AddEditOwnerModal>
      <div className="flex flex-col p-2 py-4 text-slate-400 text-sm">
        <div>
          <div> امکانات / مالکین</div>
        </div>

        <div className="flex flex-1 flex-row gap-2 justify-start items-center flex-wrap">
          {/* <button onClick={handleFetchData}>Fetch Data</button> */}
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value: string | number) => {
              if (true) {
                const current = new URLSearchParams(
                  Array.from(searchParams.entries())
                );
                if (!value) {
                  current.delete("search");
                } else {
                  current.set("search", String(value));
                }
                const search = current.toString();
                const query = search ? `?${search}` : "";
                router.push(`${pathname}${query}`);
              }
            }}
            className="placeholder-[#8ba5e2] bordercolor h-8 w-[150px] lg:w-[250px] border px-2 rounded-md my-4"
            placeholder="جستجو در نام و فامیل و پلاک  "
          />
          <Select onValueChange={setValue} defaultValue="1402-06">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="دوره را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="1"> اول </SelectItem>
                <SelectItem value="2">دوم</SelectItem>
                <SelectItem value="3">سوم</SelectItem>
                <SelectItem value="4">چهارم</SelectItem>
                <SelectItem value="5">پنجم</SelectItem>
                <SelectItem value="6">ششم</SelectItem>
                <SelectItem value="7">هفتم</SelectItem>
                <SelectItem value="8">هشتم</SelectItem>
                <SelectItem value="9">نهم</SelectItem>
                <SelectItem value="10">دهم</SelectItem>
                <SelectItem value="11">یازدهم</SelectItem>
                <SelectItem value="12">دوازدهم</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setCat1Val}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="دوره را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cat1?.map((cat: any, index: number) => (
                  <SelectItem value={cat.cat1} key={index}>
                    {cat.cat1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setCat2Val}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="دوره را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cat2?.map((cat: any, index: number) => (
                  <SelectItem value={cat.cat2} key={index}>
                    {cat.cat2}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setCat3Val}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="دوره را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cat3?.map((cat: any, index: number) => (
                  <SelectItem value={cat.cat3} key={index}>
                    {cat.cat3}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="دوره را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cat4?.map((cat: any, index: number) => (
                  <SelectItem value={cat.cat4} key={index}>
                    {cat.cat4}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FacetedFilter
            filterOption="nov"
            title="درجه سختی"
            options={[
              { label: "آسان", value: "آسان" },
              { label: "خیلی دشوار", value: "خیلی دشوار" },
              { label: "دشوار", value: "دشوار" },
              { label: "متوسط", value: "متوسط" },
            ]}
            onChange={(e) => handlesetdifficulty("nov", e)}
          ></FacetedFilter>
          <FacetedFilter
            filterOption="nov"
            title="نوع سوال"
            options={[
              { label: "تستی", value: "تستی" },
              { label: "تشریحی", value: "تشریحی" },
            ]}
            onChange={(e) => handlesetQtype("nov", e)}
          ></FacetedFilter>
        </div>
      </div>
      {canAction.add && pelak?.pelak != "all" ? (
        <Button
          className=" shadow-[#6d93ec]/50 border-0 bg-[#6d93ec] mr-28 h-8 hover:bg-[#4471da] "
          onClick={AddRecord}
          variant={"outline"}
        >
          <PlusCircle className="mx-1 h-4 w-4 text-white" />
          <span className="text-white">مالک جدید</span>
        </Button>
      ) : (
        <div className="h-8"></div>
      )}
      {owner ? (
        owner.length > 0 ? (
          <MathJaxContext config={mathJaxConfig}>
            <DataTable
              showPrint={false}
              hiddenCol={{
                g1: false,
                g2: false,
                cat1: false,
                noe: false,
                id: false,
                g3: false,
                g4: false,
                cat2: false,
                cat3: false,
                cat4: false,
                daraje: false,
                sahih: false,
              }}
              columns={columns}
              data={data}
              onPrintClick={handlePrintClick}
              isLoading={isLoading}
              onActionClick={handleActionClick}
              onDeleteClick={handleDeleteClick}
              onFileClick={handleFileClick}
              onNewFileClick={handleNewFileClick}
              allowEdit={canAction?.edit}
              allowDelete={canAction?.print}
              docadd={canAction?.docadd}
              docedit={canAction?.docedit}
              docview={canAction?.docview}
            ></DataTable>
          </MathJaxContext>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-sm text-gray-500">ردیفی پیدا نشد</p>
          </div>
        )
      ) : (
        Array.from({ length: 5 }).map((_, i) => <UserPlaceholder key={i} />)
      )}
    </div>
  );
}

const UserPlaceholder = () => (
  <div className="flex items-center justify-between space-x-3 px-1 py-3 sm:px-0">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      <div className="flex flex-col">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex flex-col">
        {/* <div className="h-4 w-24 animate-pulse rounded bg-gray-200" /> */}
        <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex flex-col">
        <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
  </div>
);

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      className=""
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
