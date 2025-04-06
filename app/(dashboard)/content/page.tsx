"use client";

import React, { useState } from "react";
import PromotionalContent from "@/components/contentManagement/promotional";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import FaqContent from "@/components/contentManagement/faq";
import Notifications from "@/components/contentManagement/notification";
import { saveContent, useContent } from "@/hooks/useContent";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "sonner";
import BackButton from "@/components/buttons/BackButton";

const tabs = [
  {
    name: "Promotional Banner",
    key: "promotional",
  },
  {
    name: "FAQs and Help Center",
    key: "faqs",
  },
  {
    name: "Notification Management",
    key: "notifications",
  },
];

function ContentManagement() {
  const [activeTab, setActiveTab] = useState("promotional");
  const { data: content, isLoading } = useContent();

  return (
    <>
      {!isLoading && (
        <section>
          <BackButton />

          <section className="flex justify-between items-center w-full p-4 ">
            {tabs.map((tab) => (
              <p
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                }}
                className={`cursor-pointer w-1/3 p-4 text-center ${
                  activeTab === tab.key
                    ? "bg-[#FFF7F1] rounded-lg text-primary shadow-md border"
                    : "text-primary-200"
                }`}
              >
                {tab.name}
              </p>
            ))}
          </section>

          <section className="py-10">
            <Formik
              initialValues={{
                faqs: content?.faqs || [],
                banners: content?.banners || [],
                advertisements: content?.advertisements || [],
                termOfService: content?.termOfService || "",
                privacyPolicy: content?.privacyPolicy || "",
              }}
              validationSchema={Yup.object({
                faqs: Yup.array().of(
                  Yup.object().shape({
                    question: Yup.string().required("Required"),
                    answer: Yup.string().required("Required"),
                  })
                ),
                banners: Yup.array().of(Yup.string().required("Required")),
                advertisements: Yup.array().of(
                  Yup.string().required("Required")
                ),
                termOfService: Yup.string().required("Required"),
                privacyPolicy: Yup.string().required("Required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await saveContent(values);
                setSubmitting(false);
                if (res) {
                  toast.success("Content saved successfully");
                }
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                setValues,
              }) => (
                <>
                  {activeTab === "promotional" && (
                    <PromotionalContent values={values} setValues={setValues} />
                  )}
                  {activeTab === "faqs" && (
                    <FaqContent
                      values={values}
                      setValues={setValues}
                      handleChange={handleChange}
                    />
                  )}
                  {activeTab === "notifications" && <Notifications />}

                  <div className="flex justify-start space-x-5 w-full bg-white h-32 pl-5 md:pl-10 items-center my-20">
                    <LottonownoButton
                      title="Cancel"
                      bgColor="bg-[#F6F6F7]"
                      textColor="text-[#BFBFC0]"
                      onClick={() => {}}
                    />
                    <LottonownoButton
                      onClick={handleSubmit}
                      title={isSubmitting ? "Please wait..." : "Update"}
                      disabled={isSubmitting}
                    />
                  </div>
                </>
              )}
            </Formik>
          </section>
        </section>
      )}
    </>
  );
}

export default ContentManagement;
