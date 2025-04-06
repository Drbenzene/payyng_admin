import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getWinners(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/draws/winners${params}`, "GET");
  return res.data;
}

export function useWinners(filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.winners],
    queryFn: () => getWinners(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.winners]);
    },
  });
  return query;
}
