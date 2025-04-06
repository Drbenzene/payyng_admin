import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getRequestLogs(queryParams: any) {
  const params = stringifyFilter(queryParams);
  const res = await APICall(`request-log${params}`, "GET");
  return res.data;
}

export function useRequestLogs(queryParams: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.requestLogs],
    queryFn: () => getRequestLogs(queryParams),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.requestLogs]);
    },
  });
  return query;
}
