import React from "react";
import LottoPasswordInputField from "../inputs/LottoPasswordInputField";
import * as Yup from "yup";
import { Formik } from "formik";
import LottonownoButton from "../buttons/LottonownoButton";
import authServices from "@/services/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SecurityComponent = () => {
  const { replace } = useRouter();
  const updatePassword = async (values: any) => {
    const payload = {
      password: values.oldPassword,
      newPassword: values.newPassword,
    };
    const res = await authServices.changePassword(payload);
    if (res) {
      toast.success("Password updated successfully");
      setTimeout(() => {
        replace("/sign-in");
        localStorage.clear();
      }, 3000);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          oldPassword: Yup.string().required("Required"),
          newPassword: Yup.string().required("Required"),
          confirmPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await updatePassword(values);
          setSubmitting(false);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleReset,
          values,
          errors,
          setValues,
          isSubmitting,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex gap-8">
              <div className="w-[280px] ">
                <p className="font-medium text-[#344054]">Current Password</p>
              </div>

              <div className="w-full">
                <LottoPasswordInputField
                  label={""}
                  name={"oldPassword"}
                  onChange={handleChange}
                  value={values.oldPassword}
                  onBlur={handleBlur}
                  type={"text"}
                  error={errors.oldPassword}
                />
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex gap-8">
              <div className="w-[280px] ">
                <p className="font-medium text-[#344054]">New password</p>
              </div>

              <div className="w-full">
                <LottoPasswordInputField
                  label={""}
                  name={"newPassword"}
                  onChange={handleChange}
                  value={values.newPassword}
                  onBlur={handleBlur}
                  type={"text"}
                  error={errors.newPassword}
                />
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex gap-8">
              <div className="w-[280px] ">
                <p className="font-medium text-[#344054]">
                  Confirm new password
                </p>
              </div>

              <div className="w-full">
                <LottoPasswordInputField
                  label={""}
                  name={"confirmPassword"}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  type={"text"}
                  error={errors.confirmPassword}
                />
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex justify-end space-x-5 w-full bg-white h-32 pl-5 md:pl-10 items-center my-20">
              <LottonownoButton
                title="Cancel"
                bgColor="bg-[#F6F6F7]"
                textColor="text-[#BFBFC0]"
                onClick={handleReset}
              />
              <LottonownoButton
                title={"Save changes"}
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(errors).length > 0}
                processing={isSubmitting}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SecurityComponent;
