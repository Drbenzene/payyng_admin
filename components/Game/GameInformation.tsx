import React, { useState } from "react";
import LottoNowNowCurrencyField from "../inputs/LottoNowNowCurrencyField";
import LottonownoWInputField from "../inputs/LottoInputField";
import { useSearchParams } from "next/navigation";
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
function GameInformation({
  values,
  errors,
  touched,
  setValues,
  handleChange,
  handleBlur,
}: IGameInfoProps) {
  // const [time, setTime] = useState<any>("00:00:00");
  const [time, setTime] = useState<any>({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // const handleChangeTime = (e: any) => {
  //   const { name, value } = e.target;
  //   setTime({
  //     ...time,
  //     [name]: Math.max(0, Math.min(Number(value), name === "days" ? 365 : 59)),
  //   });

  //   setValues({
  //     ...values,
  //     timer: `${time?.days || 0} days : ${time?.hours || 0} hours : ${
  //       time?.minutes || 0
  //     } minutes : ${time?.seconds || 0}`,
  //   });
  // };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limit values based on input type
    const limits: { [key: string]: number } = {
      days: 365,
      hours: 23,
      minutes: 59,
      seconds: 59,
    };

    const sanitizedValue = Math.max(
      0,
      Math.min(Number(value) || 0, limits[name] || 0)
    );

    const updatedTime = {
      ...time,
      [name]: sanitizedValue,
    };

    setTime(updatedTime);

    // Update the parent state synchronously after updating the time object
    setValues({
      ...values,
      timer: `${updatedTime.days || 0} days : ${
        updatedTime.hours || 0
      } hours : ${updatedTime.minutes || 0} minutes : ${
        updatedTime.seconds || 0
      }`,
    });
  };

  return (
    <section>
      <div className="my-10">
        <p className="text-lg font-semibold text-primary-100">
          Game Information
        </p>
        <p className="text-sm mt-5 font-normal  text-primary-100">
          Enter the following required fields to create a game
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Set Timer</p>
            <p className="text-[#667085] text-sm">
              Specify the time for the draw in the DD HH MM SS format
            </p>
          </div>

          <div className="w-full ">
            <div className="grid grid-cols-4 gap-5 md:gap-10">
              <input
                type="number"
                name="days"
                value={time.days}
                onChange={handleChangeTime}
                min="0"
                placeholder="D D"
                className="rounded-md text-center py-4 text-3xl w-auto"
              />

              <input
                type="number"
                name="hours"
                value={time.hours}
                onChange={handleChangeTime}
                placeholder="H H"
                min="0"
                max="23"
                className="rounded-md text-center py-4 text-3xl w-auto"
              />

              <input
                type="number"
                name="minutes"
                placeholder="M M"
                value={time.minutes}
                onChange={handleChangeTime}
                min="0"
                max="59"
                className="rounded-md text-center py-4 text-3xl w-auto"
              />

              <input
                type="number"
                name="seconds"
                placeholder="S S"
                value={time.seconds}
                onChange={handleChangeTime}
                min="0"
                max="59"
                className="rounded-md text-center py-4 text-3xl w-auto"
              />
            </div>
            <p className=" mt-5 text-xl font-extrabold">
              {time.days || 0} days : {time.hours || 0} hours :{" "}
              {time.minutes || 0} minutes : {time.seconds || 0} seconds
            </p>
          </div>
        </div>

        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Number of Stakes Required</p>
            <p className="text-[#667085] text-sm">
              Define the total number of stakes needed to start the draw{" "}
            </p>
          </div>

          <div className="w-full">
            <LottonownoWInputField
              value={values.noOfStakes}
              label={""}
              name={"noOfStakes"}
              onChange={(e: any) => {
                handleChange(e);
                setValues({
                  ...values,
                  noOfStakes: e.target.value,
                  cummStake:
                    Number(values.noOfStakes) *
                    Number(values.minimumStakeAmount || 0),
                });
              }}
              onBlur={handleBlur}
              error={errors.noOfStakes}
              type={"number"}
              placeholder="Enter Number of Stakes"
            />
            {values?.noOfStakes && (
              <p className="mt-3 text-primary font-extrabold text-xs flex justify-start items-center space-x-2">
                <FaInfoCircle />{" "}
                <span>
                  The Total Stake amount value will be{" "}
                  {currencyFormat(
                    Number(values?.minimumStakeAmount * values?.noOfStakes)
                  )}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-auto">
          <div>
            <p className="">Stake Amount</p>
            <p className="text-[#667085] text-sm">
              Specify the cost per stake in the game.{" "}
            </p>
          </div>

          <div className="w-full">
            <LottoNowNowCurrencyField
              label=""
              placeholder="Enter Stake Amount"
              value={values.minimumStakeAmount}
              error={errors.minimumStakeAmount}
              touched={touched}
              name="minimumStakeAmount"
              id="minimumStakeAmount"
              setValues={setValues}
              values={values}
              defaultalue={values.minimumStakeAmount}
              disabled={type === "default" ? true : false}
            />
          </div>
        </div>

        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Total Payout Amount</p>
            <p className="text-[#667085] text-sm">
              Enter the total amount available for payout across all winners.{" "}
            </p>
          </div>

          <div className="w-full">
            <LottoNowNowCurrencyField
              label=""
              placeholder="Enter Total Payout Amount"
              value={values.totalPayoutAmount}
              error={errors.totalPayoutAmount}
              touched={touched}
              name="totalPayoutAmount"
              id="totalPayoutAmount"
              setValues={setValues}
              values={values}
            />
            {values.totalPayoutAmount && values.noOfStakes && (
              <p className="mt-3 text-primary font-extrabold text-xs flex justify-start items-center space-x-2">
                <FaInfoCircle />{" "}
                <span>
                  This represent{" "}
                  {values.totalPayoutAmount &&
                    values.noOfStakes &&
                    (
                      (Number(values.totalPayoutAmount) /
                        Number(
                          values?.minimumStakeAmount * values?.noOfStakes
                        )) *
                      100
                    ).toFixed(2)}{" "}
                  % of the total stakes amount
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameInformation;
