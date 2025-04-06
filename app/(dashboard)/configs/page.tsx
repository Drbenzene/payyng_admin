"use client";

import React from "react";
import { updateConfigs, useConfig } from "@/hooks/useConfig";
import LottoLoader from "@/components/loader/LottoLoader";
import LottonownoWInputField from "@/components/inputs/LottoInputField";
import { Formik } from "formik";
import * as yup from "yup";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import SelectInputField from "@/components/inputs/SelectInputField";
import { toast } from "sonner";
import BackButton from "@/components/buttons/BackButton";

type Config = {
  key: string;
  value: string;
  valueDataType: string;
  options: string;
};

function Page() {
  const { data: configs, isLoading } = useConfig();

  const updateConfigHandler = async (values: any) => {
    const res = await updateConfigs({
      options: values,
    });
    if (res) {
      toast.success("Configs updated successfully");
    }
  };

  return (
    <section>
      <BackButton />
      <div>
        <div className="sm:flex-auto mb-10">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Config
          </h1>
          <p className="mt-2 text-sm  text-[#667085]">
            Update the configurations for the application
          </p>
        </div>
        {isLoading && <LottoLoader />}
        {!isLoading && configs && (
          <Formik
            initialValues={configs?.reduce(
              (acc: Record<string, string>, config: Config) => {
                acc[config.key] = config.value || "";
                return acc;
              },
              {}
            )}
            validationSchema={yup.object().shape(
              configs.reduce((acc: any, config: Config) => {
                acc[config.key] = yup
                  .string()
                  .required(`${config.key} is required`);
                return acc;
              }, {} as Record<string, yup.StringSchema>)
            )}
            onSubmit={async (values, { setSubmitting }) => {
              await updateConfigHandler(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              errors,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-3 grid-cols-1 gap-3 w-full"
              >
                {configs.map((config: Config, index: number) => (
                  <div key={index} className="w-full">
                    {config.valueDataType === "input" && (
                      <LottonownoWInputField
                        label={config.key}
                        name={config.key}
                        value={values[config.key] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        error={errors[config.key]}
                      />
                    )}
                    {config?.valueDataType === "select" && (
                      <SelectInputField
                        label={config.key}
                        name={config.key}
                        value={values[config.key] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors[config.key]}
                        data={JSON?.parse(config?.options).map((item: any) => {
                          return { value: item.value, name: item.name };
                        })}
                      />
                    )}
                  </div>
                ))}
                <div className="w-full col-span-3">
                  <div className="flex justify-end space-x-5 w-full mt-10 pl-5 md:pl-10 items-center">
                    <LottonownoButton
                      title={"Save changes"}
                      onClick={handleSubmit}
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                      processing={isSubmitting}
                    />
                  </div>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
}

export default Page;
