import { ErrorMessage } from "formik";
import React from "react";

interface Iinput {
  label: string;
  name: string;
  onChange: any;
  value: any;
  autoComplete?: string;
  required?: boolean;
  onBlur: any;
  error?: string | undefined | any;
  data: any;
}
function SelectInputField({
  label,
  data,
  name,
  onChange,
  autoComplete,
  value,
  onBlur,
  required,
  error,
}: Iinput) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={name}
          name={name}
          value={value}
          autoComplete={autoComplete}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        >
          <option value="" disabled defaultChecked>
            Select Option
          </option>
          {data.map((item: any, i: any) => (
            <option key={i} value={item?.id || item?.value}>
              {item.name}
            </option>
          ))}
        </select>
        {error && (
          <div className="text-sm text-red-400">
            <ErrorMessage name={name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectInputField;
