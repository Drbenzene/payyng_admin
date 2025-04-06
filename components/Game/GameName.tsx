"use client";

import React from "react";
import { useCategory } from "@/hooks/useCategory";
import CategoryCard from "@/components/cards/CategoryCard";
import LottoLoader from "../loader/LottoLoader";
import LottonownoWInputField from "../inputs/LottoInputField";

interface IGameNameProps {
  values: any;
  errors: any;
  touched: any;
  setValues: any;
  handleChange: any;
  handleBlur: any;
}

function GameName({
  values,
  setValues,
  handleBlur,
  handleChange,
  errors,
}: IGameNameProps) {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-extrabold text-primary-100">
          Create Game from Custom Category
        </h2>
        <p className="text-sm mt-5 font-normal  text-primary-100">
          Enter a unique game category name
        </p>
      </div>

      <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
        <div>
          <p className="">Game Name</p>
          <p className="text-[#667085] text-sm">Enter a custom game name </p>
        </div>

        <div className="w-full">
          <LottonownoWInputField
            value={values.name}
            label={""}
            name={"name"}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            placeholder="Enter Game Name"
            type={""}
          />
        </div>
      </div>
    </section>
  );
}

export default GameName;
