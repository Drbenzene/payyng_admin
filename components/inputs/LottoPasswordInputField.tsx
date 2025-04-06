import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

interface Iinput {
  label: string;
  name: string;
  onChange: any;
  value: string;
  autoComplete?: string;
  required?: boolean;
  onBlur: any;
  type: string;
  error?: any;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  max?: any;
}

function LottoPasswordInputField({
  label,
  name,
  onChange,
  autoComplete,
  value,
  onBlur,
  type,
  required,
  error,
  placeholder,
  disabled,
  maxLength,
  max,
}: Iinput) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-start  text-sm leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          max={max}
          className={`${
            disabled && "bg-gray-100"
          } focus:ring-secondary relative block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
        />

        {showPassword ? (
          <FaRegEyeSlash
            size={20}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-4 right-5 cursor-pointer"
          />
        ) : (
          <FaRegEye
            size={20}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-4 right-5 cursor-pointer"
          />
        )}

        {error && (
          <div className="text-start text-sm text-red-400">
            <ErrorMessage name={name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LottoPasswordInputField;
