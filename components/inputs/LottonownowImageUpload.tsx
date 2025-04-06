import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface LottonownowImageUpload {
  name: string;
  label: string;
  children: any;
  required?: boolean;
  disabled?: boolean;
  values: any;
  setValues: any;
  setPreview?: any;
}

const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];

function LottonownowImageUpload({
  name,
  required,
  label,
  children,
  disabled,
  values,
  setValues,
  setPreview,
}: LottonownowImageUpload) {
  const handleChange = (file: any) => {
    setValues({ ...values, [name]: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  return (
    <div>
      <label
        htmlFor={name}
        className="flex space-x-2 justify-start items-start leading-6 text-black"
      >
        {/* {required && <span className="text-red-600 mr-1">*</span>} */}
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

export default LottonownowImageUpload;
