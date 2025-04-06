"use client";
import { useState } from "react";
import ProfileComponent from "@/components/settings/ProfileComponent";
import SecurityComponent from "@/components/settings/SecurityComponent";
import SettingsTabBar from "@/components/settings/tabBar";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { FileUploader } from "react-drag-drop-files";
import { updateProfileImage } from "@/hooks/useUser";
import { toast } from "sonner";
import BackButton from "@/components/buttons/BackButton";

const PageContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  const { data: user, refetch } = useUser();
  const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];
  const [preview, setPreview] = useState(null);

  const handleChange = async (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result as any);
    };

    const formData = new FormData();
    formData.append("picture", file);
    const res = await updateProfileImage(formData);
    if (res) {
      toast.success("Profile image updated successfully");
      refetch();
    }
  };

  return (
    <>
      <div>
        <BackButton />

        <div className="w-full relative">
          <Image
            src="/images/Image-Wrap-Inner (1).svg"
            alt=""
            // fill
            width={1300}
            height={149}
            className="mb-[134px] w-full"
          />

          <div className="mb-3 rounded-full absolute md:left-[450px] top-16">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            >
              <Image
                src={preview || user?.profilePicture || "/img/Avatar.svg"}
                alt="profile-image"
                height={200}
                width={160}
                className="rounded-full"
              />
              <p className="text-primary text-center cursor-pointer">Update</p>
            </FileUploader>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-[32px] text-[#101828] leading-[38px]">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[#667085] font-normal text-base">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-8 bg-[#FFFFFF] shadow-[0px_4px_26.9px_0px_#56545414] mt-8 py-8 mb-60">
        <SettingsTabBar />

        {/* <div>
          <h1 className="text-lg font-medium text-[#101828]">Profile</h1>
        </div>

        <div></div> */}

        {user && (
          <>
            <div>
              {tab === "profile" ? (
                <ProfileComponent user={user} />
              ) : tab === "security" ? (
                <SecurityComponent />
              ) : (
                "DEVELOPMENT COMING SOON"
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
