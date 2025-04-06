import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getTickets(userId: string, filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/tickets/user/${userId}${params}`, "GET");
  return res.data;
}

export function useUserTickets(userId: string, filters: any) {
  const query = useQuery({
    queryKey: [QUERY_KEY.userTickets],
    queryFn: () => getTickets(userId, filters),
  });
  return query;
}
