import React, { useState } from "react";
import LottonownowMultipleImageUpload from "../inputs/LottonownowMultipleImageUpload";
import Image from "next/image";

interface PromotionalContentProps {
  values: any;
  setValues: any;
}

function PromotionalContent({ values, setValues }: PromotionalContentProps) {
  const [bannerPreviews, setBannerPreviews] = useState<any>(
    values?.banners || []
  );
  const [advertisementPreviews, setAdvertisementPreviews] = useState<any>(
    values?.advertisements || []
  );

  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          Promotional and Announcements Banner
        </h1>
        <p className="mt-2 text-sm  text-[#667085]">
          Create promotional banner, posts for platforms updates and promos
        </p>
      </div>
      <hr className="my-5" />

      <section>
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Landing page banner</p>
            <p className="text-[#667085] text-sm">
              Change and add banner for the landing page{" "}
            </p>
          </div>

          <div className="w-full">
            {bannerPreviews?.map((item: any, index: number) => (
              <div key={index}>
                <div className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-extrabold">
                      Landing page banner {index + 1}
                    </p>
                    <p className="text-[#667085] text-sm">
                      Change the photo/banner
                    </p>
                  </div>

                  <div className=" flex justify-center items-center space-x-3">
                    <button
                      onClick={() => {
                        setBannerPreviews(
                          bannerPreviews.filter(
                            (preview: any) => preview !== item
                          )
                        );
                      }}
                      type="button"
                      className="bg-white text-primary border px-10 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                    {/* <LottonownowMultipleImageUpload
                      name={"banners"}
                      label={""}
                      values={values}
                      setValues={setValues}
                      setPreview={setBannerPreviews}
                      preview={bannerPreviews}
                    >
                      <button
                        type="button"
                        className="bg-primary border text-white px-4 py-2 rounded-lg"
                      >
                        Change Photo
                      </button>
                    </LottonownowMultipleImageUpload> */}
                  </div>
                </div>
                <div>
                  <Image
                    key={index}
                    width={200}
                    height={200}
                    src={item}
                    alt="Banner Image"
                    className="w-full "
                  />
                </div>
              </div>
            ))}

            <LottonownowMultipleImageUpload
              name={"banners"}
              label={""}
              values={values}
              setValues={setValues}
              setPreview={setBannerPreviews}
              preview={bannerPreviews}
            >
              <p className="text-[#667085] mt-10  font-semibold text-sm cursor-pointer">
                + Add new Landing page banner
              </p>
            </LottonownowMultipleImageUpload>
          </div>
        </div>
      </section>

      <hr className="my-5" />

      <section>
        <div className="flex justify-start flex-col md:flex-row md:space-x-20  md:items-center w-full">
          <div>
            <p className="">Advertisement banner</p>
            <p className="text-[#667085] text-sm">
              Change and add advertisement banner{" "}
            </p>
          </div>

          <div className="w-full">
            {advertisementPreviews?.map((item: any, index: number) => (
              <div key={index}>
                <div className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-extrabold">
                      Advertisement banner {index + 1}
                    </p>
                    <p className="text-[#667085] text-sm">
                      Change the photo/banner
                    </p>
                  </div>

                  <div className=" flex justify-center items-center space-x-3">
                    <button
                      onClick={() => {
                        setAdvertisementPreviews(
                          advertisementPreviews.filter(
                            (preview: any) => preview !== item
                          )
                        );
                      }}
                      type="button"
                      className="bg-white text-primary border px-10 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                    {/* <LottonownowMultipleImageUpload
                      name={"advertisements"}
                      label={""}
                      values={values}
                      setValues={setValues}
                      setPreview={setAdvertisementPreviews}
                      preview={advertisementPreviews}
                    >
                      <button
                        type="button"
                        className="bg-primary border text-white px-4 py-2 rounded-lg"
                      >
                        Change Photo
                      </button>
                    </LottonownowMultipleImageUpload> */}
                  </div>
                </div>
                <div>
                  <Image
                    key={index}
                    width={200}
                    height={200}
                    src={item}
                    alt="Promo Image"
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}

            <LottonownowMultipleImageUpload
              name={"advertisements"}
              label={""}
              values={values}
              setValues={setValues}
              setPreview={setAdvertisementPreviews}
              preview={advertisementPreviews}
            >
              <p className="text-[#667085] mt-10  font-semibold text-sm cursor-pointer">
                + Add new Advertisement banner
              </p>
            </LottonownowMultipleImageUpload>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PromotionalContent;
