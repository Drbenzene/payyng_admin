import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useReport } from "@/hooks/useReport";
import moment from "moment";
import StatCard from "../cards/StatCard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface SupportReportProps {
  filters: any;
}

function SupportReport({ filters }: SupportReportProps) {
  const { data: reportData, isLoading } = useReport(filters);

  const supportStats = [
    {
      name: "Total Support Issues",
      stat:
        reportData?.reduce(
          (acc: any, curr: any) => acc + (curr.totalSupportTicket || 0),
          0
        ) || 0,
    },
    {
      name: "Total Resolved Ticket",
      stat:
        reportData?.reduce(
          (acc: any, curr: any) => acc + (curr?.resolvedTicket || 0),
          0
        ) || "0",
    },
    {
      name: "Total UnResolved Ticket",
      stat:
        reportData?.reduce(
          (acc: any, curr: any) => acc + (curr?.inProgressTicket || 0),
          0
        ) || "0",
    },
    {
      name: "Total Pending Ticket",
      stat:
        reportData?.reduce(
          (acc: any, curr: any) => acc + (curr?.pendingTicket || 0),
          0
        ) || "0",
    },
  ];

  const series = [
    {
      name: "Total Tickets",
      data: reportData?.map((item: any) => item?.totalSupportTicket || 0),
    },
  ];

  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 400, // Increase chart height for better visuals
    },
    labels: ["Resolved Tickets", "In Progress Tickets", "Pending Tickets"], // Labels for the chart
    colors: ["#6B933E", "#F0BC68", "#dc3545"], // Green, Yellow, and Red colors for clarity
    legend: {
      position: "right", // Move legend to the side
      fontSize: "16px", // Increase font size for better readability
      markers: {
        // width: 12,
        // height: 12,
      },
      itemMargin: {
        vertical: 10, // Add spacing between legend items
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "20px", // Increase the font size of the data labels
        colors: ["#000"], // Make data labels more visible
        fontWeight: "bold",
      },
      formatter: function (val: number) {
        return `${val.toFixed(1)}%`; // Format as a percentage
      },
      //   dropShadow: {
      //     enabled: true,
      //     top: 1,
      //     left: 1,
      //     blur: 2,
      //     opacity: 0.5,
      //   },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} Tickets`, // Show ticket count in the tooltip
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // Adjust donut size
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "18px",
              fontWeight: 600,
              color: "#373d3f",
              formatter: function (w: any) {
                return w.globals.seriesTotals
                  .reduce((a: number, b: number) => a + b, 0)
                  .toString();
              },
            },
          },
        },
      },
    },
  };

  const donutSeries = [
    reportData?.reduce(
      (acc: any, curr: any) => acc + (curr?.resolvedTicket || 0),
      0
    ),
    reportData?.reduce(
      (acc: any, curr: any) => acc + (curr?.inProgressTicket || 0),
      0
    ),
    reportData?.reduce(
      (acc: any, curr: any) => acc + (curr?.pendingTicket || 0),
      0
    ),
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#D3790D", "#000"],
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
      <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {supportStats.map((item) => (
          <StatCard key={item.name} name={item.name} stat={`${item.stat}`} />
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

      <div className="mt-10">
        <ReactApexChart
          options={donutOptions}
          series={donutSeries}
          type="donut"
          height={500}
        />
      </div>
    </div>
  );
}

export default SupportReport;
