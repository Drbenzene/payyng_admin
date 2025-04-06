import React from "react";
import Image from "next/image";

function LottoLoader() {
  return (
    <div className="relative mt-40 flex items-center justify-center">
      <div className="border-pink absolute h-32 w-32 animate-spin rounded-full border-b-4 border-t-4"></div>
      <Image
        src="/images/logo.svg"
        alt="Loader"
        className="h-28 w-28 rounded-full animate-pulse"
        height={40}
        width={40}
      />
    </div>
  );
}

export default LottoLoader;
