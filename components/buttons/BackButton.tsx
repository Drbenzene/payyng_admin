import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function BackButton() {
  const { back } = useRouter();
  return (
    <div>
      <button
        onClick={back}
        type="button"
        className="flex  my-10 justify-start items-center space-x-4"
      >
        <IoMdArrowBack />
        <p>Back</p>
      </button>
    </div>
  );
}

export default BackButton;
