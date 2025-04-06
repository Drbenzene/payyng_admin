import { QUERY_KEY } from "./queryKeys";
import { useQuery } from "@tanstack/react-query";
import APICall from "@/services/apiCall";

async function getUseUserStat() {
  const response = await APICall(`/users/stats`, "GET");
  return response?.data;
}

export function useUserStat() {
  const query = useQuery({
    queryKey: [QUERY_KEY.userStats],
    queryFn: getUseUserStat,
  });

  return query ?? null;
}
