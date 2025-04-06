import React, { useState } from "react";
import LottonownoWInputField from "../inputs/LottoInputField";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import LottonownoButton from "../buttons/LottonownoButton";
import LottoNowNowTextArea from "../inputs/LottoNowNowTextArea";

interface FaqContentProps {
  values: any;
  setValues: any;
  handleChange: any;
}

function FaqContent({ values, setValues, handleChange }: FaqContentProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [openEditTerms, setOpenEditTerms] = useState(false);
  const [openEditPrivacy, setOpenEditPrivacy] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<any>(null);
  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          FAQ and Help Center{" "}
        </h1>
        <p className="mt-2 text-sm  text-[#667085]">
          Update FAQs, Terms of service, privacy policies, and other user help
          content{" "}
        </p>
      </div>
      <hr className="my-5" />

      <section>
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  items-start w-full">
          <div>
            <p className="">FAQs</p>
            <p className="text-[#667085] text-sm">
              Edit and delete all FAQs on the platform{" "}
            </p>
          </div>

          <div className="w-full">
            <div>
              {values?.faqs?.length > 0 &&
                values?.faqs.map((item: any, index: number) => (
                  <div key={index} className=" p-4 border rounded-md my-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#344054]">{item?.question}</p>
                        <p className="text-[#667085] text-sm mt-3">
                          {item?.answer}
                        </p>
                      </div>

                      <div className="w-20 text-xl flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            const faqs = values.faqs.filter(
                              (faq: any) => faq.question !== item.question
                            );
                            setValues({ ...values, faqs });
                          }}
                          type="button"
                        >
                          <MdDeleteOutline />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedFaq(item);
                            setQuestion(item?.question);
                            setAnswer(item?.answer);
                            setOpenEditor(true);
                          }}
                          type="button"
                        >
                          <FiEdit2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {openEditor && (
                <>
                  <LottonownoWInputField
                    name="question"
                    label="Question"
                    placeholder="Enter question"
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setQuestion(value);
                    }}
                    value={question}
                    onBlur={undefined}
                    type={""}
                  />
                  <LottonownoWInputField
                    name="answer"
                    label="Answer"
                    placeholder="Enter answer"
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setAnswer(value);
                    }}
                    value={answer}
                    onBlur={undefined}
                    type={""}
                  />

                  <div className="my-5">
                    <LottonownoButton
                      onClick={() => {
                        if (selectedFaq) {
                          const faqs = values.faqs.map((faq: any) => {
                            if (faq.question === selectedFaq.question) {
                              return { question, answer };
                            }
                            return faq;
                          });
                          setValues({ ...values, faqs });
                        }

                        setValues({
                          ...values,
                          faqs: [...values.faqs, { question, answer }],
                        });
                        setQuestion("");
                        setAnswer("");
                        setOpenEditor(false);
                        setSelectedFaq(null);
                      }}
                      title={"Add FAQ"}
                    />
                  </div>
                </>
              )}
            </div>

            <p
              onClick={() => setOpenEditor(true)}
              className="text-[#667085] mt-10  font-semibold text-sm cursor-pointer"
            >
              + Add new FAQs
            </p>
          </div>
        </div>
      </section>

      <hr className="my-5" />

      <section>
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  items-start w-full">
          <div>
            <p className="">Terms of Service</p>
            <p className="text-[#667085] text-sm">
              Edit and update your terms of service{" "}
            </p>
          </div>

          <div className="w-full">
            {!openEditTerms ? (
              <p className="text-[#667085] text-sm mt-3">
                {values.termOfService}
              </p>
            ) : (
              <LottoNowNowTextArea
                label={"Term Of Service"}
                name={"termOfService"}
                onChange={handleChange}
                value={values.termOfService}
                onBlur={handleChange}
              />
            )}

            <p
              onClick={() => setOpenEditTerms(true)}
              className="text-[#667085] mt-10 flex  space-x-3  font-semibold text-sm cursor-pointer"
            >
              <span>
                <CiEdit />{" "}
              </span>
              <span> Edit Terms of Service</span>
            </p>
          </div>
        </div>
      </section>

      <hr className="my-5" />

      <section>
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  items-start w-full">
          <div>
            <p className="">Privacy Policy</p>
            <p className="text-[#667085] text-sm">
              Edit and update your privacy policy{" "}
            </p>
          </div>

          <div className="w-full">
            {!openEditPrivacy ? (
              <p className="text-[#667085] text-sm mt-3">
                {values.privacyPolicy}
              </p>
            ) : (
              <LottoNowNowTextArea
                label={"Privacy Policy"}
                name={"privacyPolicy"}
                onChange={handleChange}
                value={values.privacyPolicy}
                onBlur={handleChange}
              />
            )}

            <p
              onClick={() => setOpenEditPrivacy(true)}
              className="text-[#667085] mt-10 flex  space-x-3  font-semibold text-sm cursor-pointer"
            >
              <span>
                <CiEdit />{" "}
              </span>
              <span> Edit Privacy Policy</span>
            </p>
          </div>
        </div>
      </section>

      <hr className="my-5" />
    </div>
  );
}

export default FaqContent;
