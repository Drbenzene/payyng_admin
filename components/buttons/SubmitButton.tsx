import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface SubmitButtonProps {
  isLoading: boolean;
  disabled: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  isLoading,
  disabled,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      style={{
        background:
          "linear-gradient(91.58deg, #B51E0D 12.93%, rgba(214, 109, 22, 0.07) 114.46%)",
      }}
      className={clsx(
        "linear-gradient(91.58deg, #B51E0D 12.93%, rgba(214, 109, 22, 0.07) 114.46%) w-full py-3 rounded-lg text-white font-medium ",
        { "opacity-50 cursor-not-allowed": disabled || isLoading },
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/icons/loader.svg"
            width={24}
            height={24}
            alt="loader"
            className="animate-spin"
          />
          Loading ...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
