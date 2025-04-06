"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const tabButton = [
  {
    id: 1,
    description: "Profile Details",
    link: "?tab=profile",
  },
  {
    id: 2,
    description: "Security",
    link: "?tab=security",
  },
  {
    id: 4,
    description: "Audit Logs",
    link: "?tab=logs",
  },
  {
    id: 5,
    description: "Automated Alerts",
    link: "?tab=alerts",
  },
];

const SettingsTabBar = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile"; // Default to "profile" if no tab is set

  return (
    <div className="flex text-base flex-wrap items-center gap-2 mb-8">
      {tabButton.map((button) => (
        <Link key={button.id} href={button.link}>
          <div
            className={`flex text-[#667085] py-2 px-[65px] rounded-lg ${
              currentTab === button.link.split("tab=")[1]
                ? " bg-[#FFF7F1] text-primary"
                : ""
            }`}
          >
            <p className="rounded-lg font-light text-xs md:text-lg">
              {button.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SettingsTabBar;
