import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getWebhooks(queryParams: any) {
  const params = stringifyFilter(queryParams);
  const res = await APICall(`webhook${params}`, "GET");
  return res.data;
}

export function useWebhook(queryParams: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.withdrawalLogs],
    queryFn: () => getWebhooks(queryParams),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.withdrawalLogs]);
    },
  });
  return query;
}
