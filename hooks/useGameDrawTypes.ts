import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getGamesDrawsByTypeId(id: string, queryParams: any) {
  const params = stringifyFilter(queryParams);
  const res = await APICall(`draws/draw-type/${id}${params}`, "GET");
  return res.data;
}

export function useGameDrawTypes(id: string, queryParams: any) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.drawsByType],
    queryFn: () => getGamesDrawsByTypeId(id, queryParams),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.drawsByType]);
    },
  });
  return query;
}
