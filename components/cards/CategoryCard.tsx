import React from "react";
import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image: string;
  games: string;
  showCheckbox?: boolean;
  isChecked?: boolean;
}
function CategoryCard({
  name,
  image,
  games,
  showCheckbox,
  isChecked,
}: CategoryCardProps) {
  return (
    <div className="flex cursor-pointer w-full justify-start space-x-3 items-start bg-white px-2 h-20 py-4 border rounded-md">
      <Image
        src={image}
        alt="game category"
        className="w-12 h-12 ml-5"
        height={40}
        width={40}
      />

      <div className=" flex justify-between w-full items-center">
        <div>
          <p className="text-center text-lg font-semibold text-primary-100">
            {name}
          </p>
          <p className="text-sm text-gray-400">{games}</p>
        </div>

        {showCheckbox && (
          <div className="flex items-center cursor-pointer mr-3 justify-center w-6 h-6 border border-gray-300 rounded-md">
            <input
              className="w-4 h-4 cursor-pointer text-primary active:text-primary active:outline-none"
              type="checkbox"
              checked={isChecked}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
