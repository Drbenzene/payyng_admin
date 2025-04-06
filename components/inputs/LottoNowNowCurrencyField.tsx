import React from "react";
import CurrencyInput from "react-currency-input-field";

interface LevahCurrencyInputFieldProps {
  label: string;
  placeholder: string;
  value: any;
  error: any;
  touched: any;
  name: string;
  id: string;
  setValues: any;
  values: any;
  defaultalue?: number;
  disabled?: boolean;
}

function LottoNowNowCurrencyField({
  placeholder,
  id,
  name,
  touched,
  label,
  error,
  defaultalue,
  setValues,
  values,
  disabled,
}: LevahCurrencyInputFieldProps) {
  return (
    <div>
      <label className="text-left block  text-[#4F4F4F] pb-2">{label}</label>

      <CurrencyInput
        id={id}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultalue}
        decimalsLimit={2}
        prefix="NGN (₦)"
        value={values[name]}
        intlConfig={{ locale: "en-US", currency: "NGN" }}
        onValueChange={(value) => {
          setValues({
            ...values,
            [name]: value,
          });
        }}
        className="w-full px-4 h-[51px] text-sm border rounded-md focus:primary-100 focus:outline-none focus:ring-1 focus:primary-100"
      />

      <div>
        {touched && error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}

export default LottoNowNowCurrencyField;
