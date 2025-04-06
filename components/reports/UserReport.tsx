import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useReport } from "@/hooks/useReport";
import { currencyFormat } from "@/utils/helperFunc";
import moment from "moment";
import StatCard from "../cards/StatCard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface UserReportProps {
  filters: any;
}

function UserReport({ filters }: UserReportProps) {
  const { data: reportData, isLoading } = useReport(filters);
  const financialStats = [
    {
      name: "Total Users",
      stat:
        reportData?.reduce(
          (acc: number, curr: any) => acc + (curr?.totalUsers || 0),
          0
        ) || 0,
    },
    {
      name: "Verified Users",
      stat:
        reportData?.reduce(
          (acc: number, curr: any) => acc + (curr?.totalVerified || 0),
          0
        ) || 0,
    },
    {
      name: "Unverified Users",
      stat:
        reportData?.reduce(
          (acc: number, curr: any) => acc + (curr?.totalUnverified || 0),
          0
        ) || 0,
    },
  ];

  const series = [
    {
      name: "Total Users",
      data: reportData?.map((item: any) => item.totalUsers || 0),
    },
  ];

  const options: ApexOptions = {
    // Explicitly type the options as ApexOptions
    chart: {
      height: 350,
      type: "area", // Ensure the type is correctly set as a string literal
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#D3790D", "#000"], // Set the color for the area chart (e.g., Dodger Blue)
    // fill: {
    //   type: "gradient", // Optional: Use gradient fill
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.3,
    //     stops: [0, 90, 100],
    //   },
    // },
    xaxis: {
      type: "category",
      categories:
        filters?.reportRange == "weekly"
          ? reportData?.map(
              (item: any) => `${String(item?.period)?.slice(-2)}/${item?.year}`
            )
          : filters?.reportRange == "monthly"
          ? reportData?.map((item: any) => `${item?.period}/${item?.year}`)
          : filters?.reportRange == "custom"
          ? reportData?.map(
              (item: any) => `${moment(item?.period).format("DD/MM/YY")}`
            )
          : filters?.reportRange == "quarterly"
          ? reportData?.map((item: any) => `Q${item?.period}/${item?.year}`)
          : filters?.reportRange == "yearly"
          ? reportData?.map((item: any) => `${item?.period}`)
          : filters?.reportRange == "daily"
          ? reportData?.map((item: any) =>
              moment(item?.period).format("DD/MM/YY")
            )
          : [],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {financialStats.map((item) => (
          <StatCard key={item.name} name={item.name} stat={item.stat} />
        ))}
      </dl>

      <div className="mt-10">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={500}
        />
      </div>
    </div>
  );
}

export default UserReport;
