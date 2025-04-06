import { QUERY_KEY } from "./queryKeys";
import { useQuery } from "@tanstack/react-query";
import APICall from "@/services/apiCall";

async function getUser() {
  const response = await APICall(`/users/me`, "GET");
  return response?.data;
}

export async function getUserWithUserId(userId: string) {
  const response = await APICall(`/users/${userId}`, "GET");
  return response?.data;
}

export async function updateUserProfile(payload: any) {
  const response = await APICall(`/users`, "PATCH", payload);
  return response;
}

export async function setTransactionPin(payload: any) {
  const response = await APICall(`/users/set-pin`, "POST", payload);
  return response;
}

export async function updateProfileImage(payload: any) {
  const response = await APICall(
    `/users/profile-picture`,
    "POST",
    payload,
    true
  );
  return response;
}

export function useUser() {
  const query = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getUser,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query ?? null;
}
