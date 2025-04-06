"use client";

import React, { Suspense } from "react";
import BackButton from "@/components/buttons/BackButton";
import LottonownoWInputField from "@/components/inputs/LottoInputField";
import LottoNowNowCurrencyField from "@/components/inputs/LottoNowNowCurrencyField";
import * as yup from "yup";
import { Formik } from "formik";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import { createPromo, updatePromo } from "@/hooks/usePromo";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { usePromoDetails } from "@/hooks/usePromo";
import LottoLoader from "@/components/loader/LottoLoader";

function AddPromoCodeContent({ id }: { id: string | null }) {
  const { replace } = useRouter();
  const { data: promoDetails, isLoading } = usePromoDetails(id || "");

  const submitHandler = async (values: any) => {
    let res: any;

    if (id) {
      res = await updatePromo(id, {
        ...values,
        amount: Number(values.amount),
      });
    } else {
      res = await createPromo({
        ...values,
        amount: Number(values.amount),
      });
    }

    if (res) {
      toast.success(`Promo Code ${id ? "Updated" : "Created"} Successfully`);
      replace("/reward");
    }
  };

  return (
    <div>
      <BackButton />
      <div>
        <p className="text-2xl font-bold text-[#1C1C1C] mt-10 mb-5">
          Promo Code {id ? "Update" : "Creation"}
        </p>
        <p className="text-[#667085] text-sm mb-10">
          Enter the following required fields to {id ? "update" : "create"} a
          promo code
        </p>
      </div>

      {isLoading && <LottoLoader />}
      {!isLoading && (
        <Formik
          initialValues={{
            code: promoDetails?.code || "",
            amount: promoDetails?.amount || "",
            startDate: promoDetails?.startDate || "",
            endDate: promoDetails?.endDate || "",
          }}
          validationSchema={yup.object({
            code: yup.string().required("Required"),
            amount: yup.number().required("Required"),
            startDate: yup.string().required("Required"),
            endDate: yup.date().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await submitHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            isSubmitting,
            isValid,
            setValues,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-start border-b py-5 flex-col md:flex-row md:space-x-20  md:items-center w-full">
                <div>
                  <p>Promo Code Name</p>
                  <p className="text-[#667085] text-sm">
                    Enter the name for the promo code
                  </p>
                </div>
                <div className="w-full">
                  <LottonownoWInputField
                    value={values.code}
                    name="code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.code}
                    type="text"
                    placeholder="Enter Promo Code Name"
                    label={"Promo Code Name"}
                  />
                </div>
              </div>

              <div className="flex justify-start border-b py-5 flex-col md:flex-row md:space-x-20  md:items-center w-full">
                <div>
                  <p>Amount</p>
                  <p className="text-[#667085] text-sm">
                    Enter the amount for the promo code
                  </p>
                </div>
                <div className="w-full">
                  <LottoNowNowCurrencyField
                    value={values.amount}
                    name="amount"
                    error={errors.amount}
                    placeholder="Enter Amount"
                    label={"Amount"}
                    values={values}
                    setValues={setValues}
                    touched={touched}
                    id={"amount"}
                  />
                </div>
              </div>

              <div className="flex justify-start border-b py-5 flex-col md:flex-row md:space-x-20  md:items-center w-full">
                <div>
                  <p>Start Date</p>
                  <p className="text-[#667085] text-sm">
                    Enter the start date for the promo code
                  </p>
                </div>
                <div className="w-full">
                  <LottonownoWInputField
                    value={values.startDate}
                    name="startDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.startDate}
                    type="date"
                    placeholder="Enter Start Date"
                    label={"Start Date"}
                  />
                </div>
              </div>

              <div className="flex justify-start border-b py-5 flex-col md:flex-row md:space-x-20  md:items-center w-full">
                <div>
                  <p>End Date</p>
                  <p className="text-[#667085] text-sm">
                    Enter the end date for the promo code
                  </p>
                </div>
                <div className="w-full">
                  <LottonownoWInputField
                    value={values.endDate}
                    name="endDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.endDate}
                    type="date"
                    placeholder="Enter End Date"
                    label={"End Date"}
                  />
                </div>
              </div>

              <div className="flex justify-start space-x-5 w-full bg-white h-32 pl-5 md:pl-10 items-center my-20">
                <LottonownoButton
                  title="Cancel"
                  bgColor="bg-[#F6F6F7]"
                  textColor="text-[#BFBFC0]"
                  onClick={() => {}}
                />
                <LottonownoButton
                  title={`${id ? "Update" : "Complete"}`}
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isValid}
                  processing={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default function AddPromoCode() {
  return (
    <Suspense fallback={<LottoLoader />}>
      <AddPromoCodeContentWrapper />
    </Suspense>
  );
}

function AddPromoCodeContentWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <AddPromoCodeContent id={id} />;
}
