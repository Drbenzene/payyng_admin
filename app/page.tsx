"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/sign-in");
  }, []);

  return <>{/* <Seo templateTitle="Home" /> */}</>;
}
