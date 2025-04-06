import React from "react";
import { useCategory } from "@/hooks/useCategory";
import LottoNowNowCurrencyField from "../inputs/LottoNowNowCurrencyField";
import SelectInputField from "../inputs/SelectInputField";
import { GameTimers, NumberOfStakes, NumberOfWinners } from "@/utils/constant";
import { FaInfoCircle } from "react-icons/fa";
import { currencyFormat } from "@/utils/helperFunc";

interface IGameInfoProps {
  values: any;
  errors: any;
  touched: any;
  setValues: any;
  handleChange: any;
  handleBlur: any;
}
function WinnerConfiguration({
  values,
  errors,
  touched,
  setValues,
  handleChange,
  handleBlur,
}: IGameInfoProps) {
  const { data: categories, isLoading } = useCategory();

  return (
    <section>
      <div className="my-10">
        <p className="text-lg font-semibold text-primary-100">
          Winner Configuration{" "}
        </p>
        <p className="text-sm mt-5 font-normal  text-primary-100">
          Define whether you want a single winner and multiple winners{" "}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Multiple Winners</p>
            <p className="text-[#667085] text-sm">
              Select Yes or No for multiple winners.{" "}
            </p>
          </div>

          <div className="w-auto flex justify-start border items-center rounded-lg ">
            {["1", "2"].map((item) => (
              <p
                key={item}
                className={`p-4 border-r  cursor-pointer ${
                  values?.numberOfWinners === item &&
                  "bg-[#FFFBF2] text-[#D3790D]"
                }`}
              >
                {item === "1" ? "No" : "Yes"}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Number of Winners</p>
            <p className="text-[#667085] text-sm">
              Enter the number of winners{" "}
            </p>
          </div>

          <div className="w-full">
            <SelectInputField
              data={NumberOfWinners}
              value={values.numberOfWinners}
              label={""}
              name={"numberOfWinners"}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.numberOfWinners}
            />
          </div>
        </div>

        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-start w-full">
          <div>
            <p className="">Winner Payouts</p>
            <p className="text-[#667085] text-sm">
              For each winner (up to 5), specify individual payout amounts:{" "}
            </p>
          </div>

          <div className="w-full">
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
                      label={`Payout to Winner ${index + 1}`}
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

            {values?.winner1Amount && (
              <p className="mt-3 text-primary font-extrabold text-xs flex justify-start items-center space-x-2">
                <FaInfoCircle />{" "}
                <span>
                  This Winning represents{" "}
                  {(
                    (Array.from(
                      { length: Number(values?.numberOfWinners) },
                      (_, index) => Number(values[`winner${index + 1}Amount`])
                    ).reduce((acc, curr) => acc + curr, 0) /
                      Number(values?.totalPayoutAmount)) *
                    100
                  ).toFixed(2)}{" "}
                  % of the total payout amount
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WinnerConfiguration;
