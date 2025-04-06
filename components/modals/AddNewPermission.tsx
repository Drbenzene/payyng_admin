import React from "react";
import ModalLayout from "./ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottonownoButton from "../buttons/LottonownoButton";
import { addNewPermission } from "@/hooks/useUsers";
import { toast } from "sonner";

interface AddRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormValues {
  title: string;
}

function AddNewPermission({ open, setOpen }: AddRoleProps) {
  const addRoleHandler = async (values: any) => {
    const res = await addNewPermission(values);
    if (res) {
      toast.success("Permission Added Successfully");
      setOpen(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Permission is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await addRoleHandler(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <ModalLayout
          maxWidth="max-w-md"
          title="Add Permission"
          open={open}
          setOpen={setOpen}
        >
          <div className="flex flex-col justify-center items-center mb-10">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              Add New Permission
            </h3>
            <p className="mt-2 text-sm text-[#667085]">
              Fill in the details below and add a permission
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="border p-4 rounded-md">
                <LottonownoWInputField
                  label=" Permission"
                  name={"title"}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  error={errors.title}
                  placeholder="Enter Permission"
                />
              </div>
            </div>

            <div className="w-full flex justify-end items-center space-x-3 mt-5">
              <LottonownoButton
                onClick={() => setOpen(false)} // Close the modal on cancel
                title={"Cancel"}
                bgColor="white"
                textColor="black"
              />
              <LottonownoButton
                disabled={isSubmitting || !isValid}
                onClick={handleSubmit}
                title={"Add"}
              />
            </div>
          </form>
        </ModalLayout>
      )}
    </Formik>
  );
}

export default AddNewPermission;
