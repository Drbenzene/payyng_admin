"use client";

import React, { Suspense } from "react";
import LottoLoader from "@/components/loader/LottoLoader";
import AddGamePage from "@/components/Game/AddGamePage";
import BackButton from "@/components/buttons/BackButton";

function CreateGame() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <LottoLoader />
        </div>
      }
    >
      <BackButton />
      <AddGamePage />
    </Suspense>
  );
}

export default CreateGame;
