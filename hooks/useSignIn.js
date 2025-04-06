"use client";

import APICall from "@/services/apiCall";

export async function signIn(values) {
  console.log("memememe");
  const res = await APICall("/auth/login-admin", "POST", values);
  console.log("res backk", res);
  localStorage.setItem("accessToken", res?.data.token);
  return res?.data;
}
