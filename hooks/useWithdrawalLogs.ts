import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getWithdrawLogs(queryParams: any) {
  const params = stringifyFilter(queryParams);
  const res = await APICall(`payment/transfer-logs${params}`, "GET");
  return res.data;
}

export function useWithdrawalLogs(queryParams: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.withdrawalLogs],
    queryFn: () => getWithdrawLogs(queryParams),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.withdrawalLogs]);
    },
  });
  return query;
}
