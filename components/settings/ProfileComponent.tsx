import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottonownoButton from "../buttons/LottonownoButton";
import { updateUserProfile } from "@/hooks/useUser";
import { toast } from "sonner";

const ProfileComponent = ({ user }: any) => {
  const updateUserHandler = async (values: any) => {
    const res = await updateUserProfile(values);
    if (res) {
      toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="">
      <hr className="mb-5" />
      <Formik
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          playerId: user?.playerId,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          role: user?.role,
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().required("First name is required"),
          lastName: yup.string().required("Last name is required"),
          phoneNumber: yup.string().required("Phone number is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await updateUserHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          handleReset,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex gap-8">
              <div className="w-[280px] ">
                <p className="font-medium text-[#344054]">Full Name</p>
              </div>

              <div className="flex space-x-7 w-full">
                <div className="w-1/2">
                  <LottonownoWInputField
                    label={""}
                    name={"firstName"}
                    onChange={handleChange}
                    value={values.firstName}
                    onBlur={handleBlur}
                    type={"text"}
                  />
                </div>
                <div className="w-1/2">
                  <LottonownoWInputField
                    label={""}
                    name={"lastName"}
                    onChange={handleChange}
                    value={values.lastName}
                    onBlur={handleBlur}
                    type={"text"}
                  />
                </div>
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex gap-8">
              <div className="w-[280px]">
                <p className="font-medium text-[#344054]">Email Address</p>
              </div>
              <div className="w-full">
                <LottonownoWInputField
                  label={""}
                  name={"email"}
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  type={"text"}
                />
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex gap-8">
              <div className="w-[280px]">
                <p className="font-medium text-[#344054]">Phone Number</p>
              </div>
              <div className="w-full">
                <LottonownoWInputField
                  label={""}
                  name={"phoneNumber"}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  type={"text"}
                />
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex gap-8">
              <div className="w-[280px]">
                <p className="font-medium text-[#344054]">Role</p>
              </div>
              <div className="w-full">
                <LottonownoWInputField
                  label={""}
                  name={"role"}
                  onChange={handleChange}
                  value={values.role}
                  onBlur={handleBlur}
                  type={"text"}
                  disabled={true}
                />
              </div>
            </div>

            <hr className="mb-5" />

            <div className="flex gap-8 ">
              <div className="w-[280px]">
                <p className="font-medium text-[#344054]">Country</p>
              </div>
              <div className="w-full">
                <LottonownoWInputField
                  label={"Country"}
                  name={"country"}
                  onChange={handleChange}
                  value={"Nigeria"}
                  onBlur={handleBlur}
                  type={"text"}
                  disabled={true}
                />
              </div>
            </div>
            <hr className="mb-5" />

            <div className="flex justify-end space-x-5 w-full bg-white pl-5 md:pl-10 items-center">
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
    </div>
  );
};

export default ProfileComponent;
