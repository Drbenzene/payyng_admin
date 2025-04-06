import React from "react";
import { BiEdit } from "react-icons/bi";
import Image from "next/image";
import CategoryCard from "../cards/CategoryCard";
import { currencyFormat, parseTimerString } from "@/utils/helperFunc";

interface ISummaryProps {
  values: any;
  setActiveStep: any;
}
function Summary({ values, setActiveStep }: ISummaryProps) {
  return (
    <div>
      <div className="w-full flex flex-col  bg-[#D3790D29] border-[#FFF9F34A] border rounded-md">
        <div className="flex justify-between h-full p-10 border-b border-[#445E7C14] mb-5">
          <p className="text-[#312A50] font-extrabold text-xl">Game Category</p>
          <BiEdit onClick={() => setActiveStep(0)} className="cursor-pointer" />
        </div>
        <div className=" h-20 px-10 mb-10">
          <CategoryCard
            name={values?.name}
            image={"/images/game_avatar.svg"}
            games={"4 Games"}
          />
        </div>
      </div>

      {/* //GAME INFORMATION STARTS HERE */}
      <div className="w-full mt-10 flex flex-col  bg-[#D3790D29] border-[#FFF9F34A] border-2 rounded-md">
        <div className="flex justify-between h-full p-10 border-b border-[#445E7C14] mb-5">
          <p className="text-[#312A50] font-extrabold text-xl">
            Game Information
          </p>
          <BiEdit onClick={() => setActiveStep(1)} className="cursor-pointer" />
        </div>
        <div className=" h-20 mb-10">
          <Image
            src={"/images/valentine.svg"}
            alt={"Valentine"}
            height={500}
            width={800}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full px-10 pb-5 ">
          <p className="text-[#312A50] pb-5">Timer (DD-HH-MM-SS)</p>
          <div className="grid grid-cols-4 gap-5 md:gap-10">
            {parseTimerString(values?.timer)?.map(
              (item: any, index: number) => (
                <input
                  key={index}
                  type="number"
                  name="days"
                  value={item}
                  min="0"
                  placeholder="D D"
                  disabled
                  className="rounded-md border border-[#667085] disabled:bg-white text-center py-5 text-2xl w-auto"
                />
              )
            )}
          </div>
        </div>

        <div className="w-full px-10 pb-5 ">
          <div className="grid grid-cols-3 gap-4">
            {["noOfStakes", "minimumStakeAmount", "totalPayoutAmount"].map(
              (item) => (
                <div key={item}>
                  <p className="text-[#312A50] pb-5">
                    {item
                      ?.replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim()}
                  </p>
                  <p className="text-[#312A50] border-[#F2F2F2] order py-3 font-extrabold bf-[#F2F2F2A3]">
                    {item === "totalPayoutAmount" ||
                    item === "minimumStakeAmount"
                      ? currencyFormat(values[item])
                      : `${values[item]} Stakes`}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* //GAME WINNER CONFIGURATION STARTS HERE */}
      <div className="w-full mt-10 flex flex-col  bg-[#D3790D29] border-[#FFF9F34A] border-2 rounded-md">
        <div className="flex justify-between h-full p-10 border-b border-[#445E7C14] mb-5">
          <p className="text-[#312A50] font-extrabold text-xl">
            Winner Configuration{" "}
          </p>
          <BiEdit onClick={() => setActiveStep(2)} className="cursor-pointer" />
        </div>

        <div className="w-full px-10 pb-5 ">
          <div className="flex space-x-5 justify-start items-center ">
            <div>
              <p className="text-[#312A50] pb-5">Multiple Winners</p>
              <p className="text-[#312A50] border-[#F2F2F2] order py-3 font-extrabold bf-[#F2F2F2A3]">
                {values?.winner2Amount > 0 ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-[#312A50] pb-5">Number of Winners</p>
              <p className="text-[#312A50] border-[#F2F2F2] order py-3  font-extrabold bf-[#F2F2F2A3]">
                {values?.numberOfWinners}
              </p>
            </div>
          </div>

          <div className="flex mt-10 space-x-5 md:space-x-20 items-start ">
            {[
              "winner1Amount",
              "winner2Amount",
              "winner3Amount",
              "winner4Amount",
              "winner5Amount",
            ].map((item, index) => (
              <div key={item}>
                {values[item] > 0 && (
                  <div>
                    <p className="text-[#312A50] pb-5">
                      Payout to Winner {index + 1}
                    </p>
                    <p className="text-[#312A50] border-[#F2F2F2] order py-3 font-extrabold bf-[#F2F2F2A3]">
                      {currencyFormat(values[item])}
                    </p>
                    <hr />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
