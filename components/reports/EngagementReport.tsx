import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useReport } from "@/hooks/useReport";
import StatCard from "../cards/StatCard";
import { currencyFormat } from "@/utils/helperFunc";
import moment from "moment";
import { report } from "process";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface EngagementReportProps {
  filters: any;
}

function EngagementReport({ filters }: EngagementReportProps) {
  const { data: reportData, isLoading } = useReport(filters);

  console.log("reportData", reportData);

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {reportData && (
          <>
            <StatCard
              name="Total Used Referral Code"
              stat={reportData?.referrals?.length || "--"}
            />
            <StatCard
              name="Total Used Promo Code"
              stat={
                reportData?.promos?.reduce(
                  (acc: number, promo: any) => acc + promo?.redeems?.length,
                  0
                ) || "--"
              }
            />
            {reportData?.promos?.map((promo: any) => (
              <div key={promo?.id}>
                <StatCard
                  name={promo?.code}
                  stat={promo?.redeems?.length || 0}
                />
              </div>
            ))}
          </>
        )}
      </dl>
    </div>
  );
}

export default EngagementReport;
