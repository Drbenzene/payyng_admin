import React from "react";
import LottonownowImageUpload from "../inputs/LottonownowImageUpload";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottoNowNowCurrencyField from "../inputs/LottoNowNowCurrencyField";
import Image from "next/image";
import LottonownoButton from "../buttons/LottonownoButton";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Notifications() {
  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          Notification Management{" "}
        </h1>
        <p className="mt-2 text-sm  text-[#667085]">
          Configure automated email and in-app notifications
        </p>
      </div>

      <hr className="my-5" />

      <p>
        BLOCKED CLARIFICATION NEEDED ON THE WORKING PRINCIPLE OF THIS
        NOTIFICATION SECTION FOR ADMIN
      </p>
    </div>
  );
}

export default Notifications;
