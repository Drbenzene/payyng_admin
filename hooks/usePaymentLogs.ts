import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getPaymentLogs(queryParams: any) {
  const params = stringifyFilter(queryParams);
  const res = await APICall(`payment/logs${params}`, "GET");
  return res.data;
}

export function usePaymentLogs(queryParams: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.paymentLogs],
    queryFn: () => getPaymentLogs(queryParams),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.paymentLogs]);
    },
  });
  return query;
}
