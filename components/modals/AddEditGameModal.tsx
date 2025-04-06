import React from "react";
import ModalLayout from "./ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import SelectInputField from "../inputs/SelectInputField";
import LottonownoWInputField from "../inputs/LottoInputField";
import { GameTimers, NumberOfStakes, NumberOfWinners } from "@/utils/constant";
import LottonownoButton from "../buttons/LottonownoButton";
import LottoNowNowCurrencyField from "../inputs/LottoNowNowCurrencyField";

interface AddEditGamesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface FormValues {
  name: string;
  timer: string;
  noOfStakes: string;
  minimumStakeAmount: string;
  numberOfWinners: string;
  [key: `winner${number}Amount`]: number; // Allow dynamic fields
}

function AddEditGameModal({ open, setOpen }: AddEditGamesProps) {
  return (
    <Formik<FormValues>
      initialValues={{
        name: "",
        timer: "",
        noOfStakes: "",
        minimumStakeAmount: "",
        numberOfWinners: "1",
        winner1Amount: 0,
        winner2Amount: 0,
        winner3Amount: 0,
        winner4Amount: 0,
        winner5Amount: 0,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        timer: Yup.string().required("Game Timer Is required"),
        noOfStakes: Yup.number()
          .required("Number of Stakes is required")
          .min(3),
        minimumStakeAmount: Yup.number().required("Stake Amount is required"),
        numberOfWinners: Yup.number()
          .required("Required")
          .min(1, "At least one winner is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        setValues,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <ModalLayout
          maxWidth="max-w-xl"
          title="Add New Game Type"
          open={open}
          setOpen={setOpen}
        >
          <form>
            <div className="grid grid-cols-1 gap-y-2">
              <LottonownoWInputField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                error={errors.name}
                placeholder="Enter game name"
              />

              <LottoNowNowCurrencyField
                label=" Stake Amount"
                placeholder="Enter Stake Amount"
                value={values.minimumStakeAmount}
                error={errors.minimumStakeAmount}
                touched={touched}
                name="minimumStakeAmount"
                id="minimumStakeAmount"
                setValues={setValues}
                values={values}
              />

              <SelectInputField
                data={GameTimers}
                value={values.timer}
                label={"Game Timer"}
                name={"timer"}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.timer}
              />

              <SelectInputField
                data={NumberOfStakes}
                value={values.noOfStakes}
                label={"Number Of Stakes"}
                name={"noOfStakes"}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.noOfStakes}
              />

              <SelectInputField
                data={NumberOfWinners}
                value={values.numberOfWinners}
                label={"Number Of Winners"}
                name={"numberOfWinners"}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.numberOfWinners}
              />

              {values.numberOfWinners &&
                Array.from(
                  { length: Number(values.numberOfWinners) },
                  (_, index) => {
                    const fieldKey = `winner${
                      index + 1
                    }Amount` as `winner${number}Amount`;

                    return (
                      <LottoNowNowCurrencyField
                        key={fieldKey}
                        label={`${index + 1}${
                          index === 0
                            ? "st"
                            : index === 1
                            ? "nd"
                            : index === 2
                            ? "rd"
                            : "th"
                        } Winning Amount`}
                        placeholder={`Enter Winning Amount for Winner ${
                          index + 1
                        }`}
                        value={values[fieldKey]}
                        error={errors[fieldKey]}
                        touched={touched}
                        name={fieldKey}
                        id={fieldKey}
                        setValues={setValues}
                        values={values}
                      />
                    );
                  }
                )}
            </div>

            <div className="w-full mt-5">
              <LottonownoButton
                disabled={isSubmitting || !isValid}
                onClick={handleSubmit}
                title={"Add Game"}
              />
            </div>
          </form>
        </ModalLayout>
      )}
    </Formik>
  );
}

export default AddEditGameModal;
