import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getAllTickets(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/tickets/all${params}`, "GET");
  return res.data;
}

export function useAllTickets(filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.allTickets],
    queryFn: () => getAllTickets(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.allTickets]);
    },
  });
  return query;
}
