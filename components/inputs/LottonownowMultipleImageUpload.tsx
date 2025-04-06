import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface LottonownowMultipleImageUpload {
  name: string;
  label: string;
  children: any;
  disabled?: boolean;
  values: any;
  setValues: any;
  setPreview: React.Dispatch<React.SetStateAction<string[]>>;
  preview: string[] | undefined; // Allow undefined for extra safety
}

const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];

function LottonownowMultipleImageUpload({
  name,
  label,
  children,
  disabled,
  values,
  setValues,
  setPreview,
  preview = [],
}: LottonownowMultipleImageUpload) {
  const handleChange = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string; // Ensuring type safety
      setPreview([...(preview || []), base64]); // Ensure preview is an array befo
      setValues({
        ...values,
        [name]: [...(preview || []), base64],
      });
    };
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="flex space-x-2 justify-start items-start leading-6 text-black"
      >
        {label}
      </label>

      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        disabled={disabled}
      >
        {children}
      </FileUploader>
    </div>
  );
}

export default LottonownowMultipleImageUpload;
