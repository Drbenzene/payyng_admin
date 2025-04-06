import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getGameDraws(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/draws/all${params}`, "GET");
  return res.data;
}

export function useDraws(filters: any) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.drawTypes],
    queryFn: () => getGameDraws(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.drawTypes]);
    },
  });
  return query;
}
