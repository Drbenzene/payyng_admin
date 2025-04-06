"use client";

import React, { useState } from "react";
import LottonownoWInputField from "@/components/inputs/LottoInputField";
import LottoPasswordInputField from "@/components/inputs/LottoPasswordInputField";
import { Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "@/hooks/useSignIn";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/buttons/SubmitButton";
import { toast } from "sonner";

const LottonownowSignin = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { push, replace } = useRouter();
  return (
    <>
      <div className="flex-col items-center w-full min-w-[400px]">
        <div className="text-center w-full mb-10">
          <p className="text-xl font-semibold text-primary-100">Sign In</p>
          <p className="text-sm  text-center mt-5 font-normal  text-primary-100">
            To resume back, please enter your details.{" "}
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await signIn(values);
            if (res) {
              toast.success("Welcome Back");
              replace("/overview");
            }
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
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 gap-y-2">
                <LottonownoWInputField
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  error={errors.email}
                  placeholder="Enter Email Address"
                />

                <LottoPasswordInputField
                  label="Enter Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  error={errors.password}
                  placeholder="Enter Password"
                />

                <div className="my-5 flex justify-between items-center">
                  <p className="cursor-pointer text-xs text-primary-100">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() =>
                        setPasswordVisibility(!passwordVisibility)
                      }
                    />
                    Keep me signed in
                  </p>
                  <p
                    onClick={() => push("/auth/forgot-password")}
                    className="cursor-pointer text-primary underline text-xs text-primary-100"
                  >
                    Forget Password
                  </p>
                </div>

                <div className="mt-5">
                  <SubmitButton
                    isLoading={isSubmitting}
                    disabled={false}
                    // disabled={isSubmitting || !isValid}
                  >
                    Proceed
                  </SubmitButton>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LottonownowSignin;
