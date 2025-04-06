import React from "react";
import { IoMdTrendingUp } from "react-icons/io";
interface StatCardProps {
  name: string;
  stat: string;
}
function StatCard({ name, stat }: StatCardProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <div className="flex justify-between items-center">
          <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
          <span className={"p-2 rounded-full bg-[#D1FADF] text-[#039855]"}>
            <IoMdTrendingUp size={30} />
          </span>
        </div>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {stat}
        </dd>
      </div>
    </div>
  );
}

export default StatCard;
