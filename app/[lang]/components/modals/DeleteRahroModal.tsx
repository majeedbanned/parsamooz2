"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
export const DeleteRahroModal = ({
  mutation,
  data,
  delLabel1,
  delLabel2,
}: {
  mutation: () => void;
  data: string;
  delLabel1: string;
  delLabel2: string;
}) => {
  const _DeleteRahroModal = useDeleteRahroModal();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //  console.log("deleted >" + _DeleteRahroModal.editID);
    const promise = () =>
      new Promise((resolve) => {
        setIsLoading(true);
        fetch(`/api/rahro/${_DeleteRahroModal.editID}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
          setIsLoading(false);
          if (res.status === 200) {
            toast.success(`اطلاعات با موفقیت حذف شد`);
            mutation();
            _DeleteRahroModal.onClose();
            resolve("");
          } else {
            const error = await res.text();
            toast.error(error);
            rejects;
          }
        });
      });

    toast.promise(promise, {
      loading: "حذف اطلاعات ...",
      success: (data) => {
        toast.dismiss();
        return `${data} `;
      },
      error: "Error",
    });
    return;
  };

  const onToggle = useCallback(() => {
    _DeleteRahroModal.onClose();
    //  registerModal.onOpen();
  }, [_DeleteRahroModal]);

  const bodyContent = (
    <div className="flex items-center gap-3 rounded-md border border-gray-300 bg-white p-3">
      <TrashIcon
        width={40}
        height={40}
        className="overflow-hidden rounded-full text-red-500 border-gray-200"
      />
      <div className="flex flex-col">
        <h3 className="text-sm font-medium">{delLabel1}</h3>
        <p className="text-xs text-gray-500">{delLabel2}</p>
      </div>
    </div>
  );

  const footerContent = <div className="flex flex-col gap-4 mt-3"></div>;
  return (
    <Modal
      disabled={isLoading}
      isOpen={_DeleteRahroModal.isOpen}
      title="حذف اطلاعات"
      // "افزودن واحد"
      actionLabel="حذف"
      actionLabelVariant="destructive"
      secondaryActionLabel="انصراف"
      secondaryAction={_DeleteRahroModal.onClose}
      onClose={_DeleteRahroModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      description="در صورت تایید , این ردیف حذف خواهد شد"
    />
  );
};

import { create } from "zustand";
import { toast } from "sonner";
import Modal from "./Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { rejects } from "assert";

interface DeleteRahroModal {
  isOpen: boolean;
  editID: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useDeleteRahroModal = create<DeleteRahroModal>((set) => ({
  isOpen: false,
  editID: "",
  onOpen: (id) => set({ isOpen: true, editID: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteRahroModal;
