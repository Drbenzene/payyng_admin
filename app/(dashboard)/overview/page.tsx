"use client";

import React, { useEffect, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaAngleUp } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import FinancialReport from "@/components/reports/FinancialReport";
import { useReport } from "@/hooks/useReport";
import { METRICS_TYPES, REPORT_RANGE_OPTIONS } from "@/utils/constant";
import { FaRegCalendarAlt } from "react-icons/fa";
import UserReport from "@/components/reports/UserReport";
import WalletReport from "@/components/reports/WalletReport";
import GameReport from "@/components/reports/GameReport";
import ModalLayout from "@/components/modals/ModalLayout";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import LottonownoWInputField from "@/components/inputs/LottoInputField";
import * as Yup from "yup";
import { Formik } from "formik";
import SupportReport from "@/components/reports/SupportReport";
import { convertArrayOfObjectsToWorksheet } from "@/utils/helperFunc";
import EngagementReport from "@/components/reports/EngagementReport";

function ReportsOverview() {
  const [activeMetrics, setActiveMetrics] = useState("Financial Metrics");
  const [activeReportRange, setActiveReportRange] = useState("This Year");
  const [openCustomFilter, setOpenCustomFilter] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [filters, setFilters] = useState({
    reportType: "financial",
    reportRange: "monthly",
    from: "",
    to: "",
  });
  const { data: reportData, isLoading, refetch } = useReport(filters);

  useEffect(() => {
    refetch();
  }, [reportData, filters]);

  const downloadDataHandler = async () => {
    setProcessing(true);
    await convertArrayOfObjectsToWorksheet(
      reportData,
      `${activeMetrics} Report ${
        filters?.reportRange
      } ${new Date().toDateString()}`
    );
    setProcessing(false);
  };

  return (
    <section>
      <section className="flex  flex-col md:flex-row space-y-5 md:space-y-0 justify-center md:justify-between items-center">
        <div>
          <p className="text-lg font-semibold flex justify-start items-center space-x-5  text-primary-100">
            <span>Report overview</span>{" "}
          </p>
          <p className="text-sm font-normal text-center text-primary-100">
            Your current report summary and activity.{" "}
          </p>
        </div>

        <div>
          <button
            onClick={downloadDataHandler}
            className="bg-primary-500 border px-4 py-2 rounded-lg flex justify-center items-center space-x-3"
            type="button"
            disabled={processing}
          >
            <IoCloudDownloadOutline />
            <span>{processing ? "Downloading..." : "Export report"}</span>
          </button>
        </div>
      </section>

      {/* //FINANCIAL METRICS STARTS STARTS HERE */}

      <section className="rounded-md relative p-2 md:p-5 bg-[#FCFCFC] w-full h-full mt-10 ">
        <Popover>
          {({ close }) => (
            <>
              <PopoverButton>
                <p className="text-lg font-semibold flex justify-start items-center space-x-5  text-primary-100 border-none focus:outline-none">
                  <span>{activeMetrics}</span>{" "}
                  <FaAngleUp className="cursor-pointer" />
                </p>
              </PopoverButton>
              <PopoverPanel className="bg-white z-50 w-60 absolute flex flex-col shadow-lg rounded-lg border border-gray-200 p-2">
                <button className="w-full text-left focus:outline-none flex flex-col space-y-5">
                  {METRICS_TYPES.map((item: any) => (
                    <p
                      onClick={() => {
                        setActiveMetrics(item.name);
                        setFilters({
                          ...filters,
                          reportType: item.key,
                        });
                        close(); // Close the popover after selection
                      }}
                      key={item.key}
                      className="text-sm text-gray-900 cursor-pointer w-full hover:text-primary  focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {item.name}
                    </p>
                  ))}
                </button>
              </PopoverPanel>
            </>
          )}
        </Popover>{" "}
        <div className="flex justify-between items-center w-full mt-5">
          <div>
            <p className="text-lg font-semibold text-primary-100">
              {activeReportRange}
            </p>
          </div>
          <Popover>
            <PopoverButton>
              <button className="border focus:outline-none font-semibold flex justify-start space-x-6 items-center px-2 py-3 rounded-lg ">
                <span>
                  <FaRegCalendarAlt />
                </span>
                <span>{activeReportRange}</span>{" "}
                <FaAngleUp className="cursor-pointer" />
              </button>
            </PopoverButton>
            <PopoverPanel className="bg-white z-50 w-60 absolute flex flex-col shadow-lg rounded-lg border border-gray-200 p-2">
              <button className="w-full text-left focus:outline-none flex flex-col space-y-5">
                {REPORT_RANGE_OPTIONS.map((item) => (
                  <p
                    onClick={() => {
                      if (item.key === "custom") {
                        return setOpenCustomFilter(!openCustomFilter);
                      }
                      setActiveReportRange(item.name);
                      setFilters({
                        ...filters,
                        reportRange: item.key,
                      });
                    }}
                    key={item.key}
                    className="text-sm text-gray-900 cursor-pointer w-full hover:text-primary  focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {item.name}
                  </p>
                ))}
              </button>
            </PopoverPanel>
          </Popover>{" "}
        </div>
        {/* /THE REPORT INDIVIDUALLY STARTS HERE  */}
        {activeMetrics === "Financial Metrics" && (
          <FinancialReport filters={filters} />
        )}
        {activeMetrics === "User Metrics" && <UserReport filters={filters} />}
        {activeMetrics === "Wallet & Transaction Metrics" && (
          <WalletReport filters={filters} />
        )}
        {activeMetrics === "Game Metrics" && <GameReport filters={filters} />}
        {activeMetrics === "Customer Support Metrics" && (
          <SupportReport filters={filters} />
        )}
        {activeMetrics === "Engagement Metrics" && (
          <EngagementReport filters={filters} />
        )}
        {/* /THE REPORT INDIVIDUALLY ENDS HERE  */}
      </section>

      {/* //CUSTOM FILTER STARTS HERE  */}
      <ModalLayout
        maxWidth="max-w-sm"
        open={openCustomFilter}
        setOpen={() => setOpenCustomFilter(!openCustomFilter)}
        title={"Custom Filter"}
      >
        <div className="flex flex-col space-y-5">
          <div>
            <p className="text-sm font-normal text-primary-100">
              Filter your report by custom date range.
            </p>
          </div>
          <Formik
            initialValues={{
              from: "",
              to: "",
            }}
            validationSchema={Yup.object().shape({
              from: Yup.string().required("Start Date is required"),
              to: Yup.string().required("End Date is required"),
            })}
            onSubmit={(values: any) => {
              setActiveReportRange("Custom");
              setFilters({
                ...filters,
                from: values.from,
                to: values.to,
                reportRange: "custom",
              });
              setOpenCustomFilter(false);
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <LottonownoWInputField
                    label="Start Date"
                    type="date"
                    name="from"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from}
                    error={errors.from}
                  />
                  <LottonownoWInputField
                    label="End Date"
                    type="date"
                    name="to"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.to}
                    error={errors.to}
                  />
                </div>
                <div>
                  <LottonownoButton
                    onClick={() => handleSubmit()}
                    title={"Apply Filter"}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </ModalLayout>
    </section>
  );
}

export default ReportsOverview;
