"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import GameInformation from "@/components/Game/GameInformation";
import WinnerConfiguration from "@/components/Game/WinnerConfiguration";
import SelectGameCategory from "@/components/Game/SelectGameCategory";
import GameName from "@/components/Game/GameName";
import Summary from "@/components/Game/Summary";
import drawService from "@/services/actions/draws";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useGameDetails } from "@/hooks/useGames";
import LottoLoader from "@/components/loader/LottoLoader";

interface FormValues {
  categoryId: string;
  name: string;
  timer: string;
  noOfStakes: string;
  minimumStakeAmount: string;
  numberOfWinners: string;
  totalPayoutAmount: any;
  [key: `winner${number}Amount`]: number; // Allow dynamic fields
}

function AddGamePage() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const { data: gameDetails, isLoading } = useGameDetails(id as string);

  const steps = [
    {
      id: 1,
      title: "Game Category",
      description: "Select from category",
    },
    {
      id: 2,
      title: "Game Information Input",
      description: "Fill the following required fields",
    },
    {
      id: 3,
      title: "Winner Configuration",
      description: "Choose Single or Multiple Winners",
    },
    {
      id: 4,
      title: "Game Summary & Confirmation",
      description: "Summary of details for review",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const nextStepHandler = async (values: any, errors: any) => {
    if (activeStep === 0) {
      if (type === "default" && !values.categoryId) {
        return toast.error("Please select a category");
      }
      if (type === "custom" && !values.name) {
        return toast.error("Please enter a game name");
      }
    }

    if (Number(activeStep) === 1) {
      if (!values.timer) {
        return toast.error("Please enter game timer");
      }
      if (!values.noOfStakes) {
        return toast.error("Please enter number of stakes");
      }
      if (!values.totalPayoutAmount) {
        return toast.error("Please enter total payout amount");
      }
    }

    if (Number(activeStep) === 2) {
      if (!values.numberOfWinners) {
        return toast.error("Please enter number of winners");
      }

      if (!values.winner1Amount) {
        return toast.error("Please enter winner 1 amount");
      }
    }
    setActiveStep(activeStep + 1);
  };

  const prevStepHandler = (values: any) => {
    setActiveStep(activeStep - 1);
  };

  const submitHandler = async (values: any) => {
    const payload = {
      ...values,
      noOfStakes: Number(values.noOfStakes),
      minimumStakeAmount: Number(values.minimumStakeAmount),
      numberOfWinners: Number(values.numberOfWinners),
      winner1Amount: Number(values.winner1Amount),
      winner2Amount: Number(values.winner2Amount),
      winner3Amount: Number(values.winner3Amount),
      winner4Amount: Number(values.winner4Amount),
      winner5Amount: Number(values.winner5Amount),
    };
    const res = await drawService.createDraw(payload);
    if (res) {
      toast.success("Game Created Successfully");
      replace("/games");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LottoLoader />
      </div>
    );
  }

  return (
    <section>
      <div className="my-10 flex justify-between space-x-3 items-center w-full ">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`border-t-4 ${
              activeStep >= step.id - 1 && "border-primary"
            }`}
          >
            <p className="text-lg font-semibold text-primary-100">
              {step.title}
            </p>
            <p className="text-sm mt-3 font-normal text-primary-100">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <section className="my-10">
        <Formik<FormValues>
          initialValues={{
            categoryId: gameDetails?.categoryId || "",
            name: gameDetails?.name || "",
            timer: gameDetails?.timer || "",
            noOfStakes: gameDetails?.noOfStakes || "",
            minimumStakeAmount: gameDetails?.stakeAmount || "",
            numberOfWinners: gameDetails?.numberOfWinners || "1",
            winner1Amount: Number(gameDetails?.winner1Amount) || 0,
            winner2Amount: Number(gameDetails?.winner2Amount) || 0,
            winner3Amount: Number(gameDetails?.winner3Amount) || 0,
            winner4Amount: Number(gameDetails?.winner4Amount) || 0,
            winner5Amount: Number(gameDetails?.winner5Amount) || 0,
            totalPayoutAmount:
              Number(
                gameDetails?.winner1Amount +
                  gameDetails?.winner2Amount +
                  gameDetails?.winner3Amount +
                  gameDetails?.winner4Amount +
                  gameDetails?.winner5Amount
              ) || 0,
          }}
          validationSchema={Yup.object({
            timer: Yup.string().required("Game Timer Is required"),
            noOfStakes: Yup.number()
              .required("Number of Stakes is required")
              .min(3),
            numberOfWinners: Yup.number()
              .required("Required")
              .min(1, "At least one winner is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await submitHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            errors,
            setValues,
            handleBlur,
            handleSubmit,
            touched,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <>
                  {type === "default" ? (
                    <SelectGameCategory
                      values={values}
                      errors={errors}
                      touched={touched}
                      setValues={setValues}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  ) : (
                    <GameName
                      values={values}
                      errors={errors}
                      touched={touched}
                      setValues={setValues}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                </>
              )}

              {activeStep === 1 && (
                <GameInformation
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValues={setValues}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
              {activeStep === 2 && (
                <WinnerConfiguration
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValues={setValues}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}

              {activeStep === 3 && (
                <Summary values={values} setActiveStep={setActiveStep} />
              )}

              <div className="flex justify-start space-x-5 w-full bg-white h-32 pl-5 md:pl-10 items-center my-20">
                <LottonownoButton
                  title="Cancel"
                  bgColor="bg-[#F6F6F7]"
                  textColor="text-[#BFBFC0]"
                  onClick={() => prevStepHandler(values)}
                />
                <LottonownoButton
                  title={activeStep === 3 ? "Activate" : "Continue"}
                  onClick={() =>
                    activeStep === 3
                      ? handleSubmit()
                      : nextStepHandler(values, errors)
                  }
                  disabled={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
      </section>
    </section>
  );
}

export default AddGamePage;
