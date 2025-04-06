import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useReport } from "@/hooks/useReport";
import { currencyFormat } from "@/utils/helperFunc";
import moment from "moment";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface FinancialReportProps {
  filters: any;
}

function FinancialReport({ filters }: FinancialReportProps) {
  const { data: reportData, isLoading } = useReport(filters);

  const financialStats = [
    {
      name: "Total Game Deposits",
      stat:
        currencyFormat(
          reportData?.reduce(
            (acc: any, curr: any) => acc + (curr.totalCredit || 0),
            0
          )
        ) || "₦0.00",
    },
    {
      name: "Total Game Refunds",
      stat:
        currencyFormat(
          reportData?.reduce(
            (acc: any, curr: any) => acc + (curr.totalRefund || 0),
            0
          )
        ) || "₦0.00",
    },
    {
      name: "Total Payout",
      stat:
        currencyFormat(
          reportData?.reduce(
            (acc: any, curr: any) => acc + (curr.totalDebit || 0),
            0
          )
        ) || "₦0.00",
    },
    {
      name: "GGR (Gross Gaming Revenue)",
      stat:
        currencyFormat(
          reportData?.reduce(
            (acc: any, curr: any) =>
              acc +
              ((curr.totalCredit || 0) -
                (curr.totalDebit || 0) -
                (curr.totalRefund || 0)),
            0
          )
        ) || "₦0.00",
    },
  ];

  const series = [
    {
      name: "Total Amount",
      data: reportData?.map((item: any) => item.totalAmount || 0),
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
      <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
        {financialStats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={500}
        />
      </div>
    </div>
  );
}

export default FinancialReport;
