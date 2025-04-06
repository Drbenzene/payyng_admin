"use client";

import React from "react";
import { useCategory } from "@/hooks/useCategory";
import CategoryCard from "@/components/cards/CategoryCard";
import LottoLoader from "../loader/LottoLoader";

interface ISelectGameCategoryProps {
  values: any;
  errors: any;
  touched: any;
  setValues: any;
  handleChange: any;
  handleBlur: any;
}

function SelectGameCategory({ values, setValues }: ISelectGameCategoryProps) {
  const { data: categories, isLoading } = useCategory();

  return (
    <section>
      <div>
        <h2>Create Game from Default Category</h2>
        <p className="text-sm mt-5 font-normal  text-primary-100">
          Select{" "}
          <span className="text-primary-200 font-extrabold">one (1) </span>from
          the 11 existing game categories
        </p>
      </div>

      <div>
        {isLoading && <LottoLoader />}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-10">
          {categories &&
            categories.map((category: any, index: number) => (
              <div
                onClick={() => {
                  setValues({
                    ...values,
                    categoryId: category.id,
                    minimumStakeAmount: category.stake,
                  });
                }}
                key={index}
              >
                <CategoryCard
                  name={category.name}
                  image={category.imageUrl}
                  games={"4 Games"}
                  showCheckbox={true}
                  isChecked={values.categoryId === category.id}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default SelectGameCategory;
