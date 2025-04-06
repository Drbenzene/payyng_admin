import { ErrorMessage } from "formik";
import React from "react";

interface Iinput {
  label: string;
  name: string;
  onChange: any;
  value: string;
  autoComplete?: string;
  required?: boolean;
  onBlur: any;
  error?: any;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

function LottoNowNowTextArea({
  label,
  name,
  onChange,
  autoComplete,
  value,
  onBlur,
  required,
  error,
  placeholder,
  disabled,
  maxLength,
}: Iinput) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-start  text-sm leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          value={value}
          autoComplete={autoComplete}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          rows={10}
          cols={10}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${
            disabled && "bg-gray-100"
          } focus:ring-secondary block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
        />
        {error && (
          <div className="text-start text-sm text-red-400">
            <ErrorMessage name={name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LottoNowNowTextArea;
