import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getAdminWalletModifyLog(params: any) {
  const query = stringifyFilter(params);
  const res = await APICall(`/wallet/modify-logs${query}`, "GET");
  return res.data;
}

export function useAdminWalletModifyLogs(params: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.walletStat],
    queryFn: () => getAdminWalletModifyLog(params),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.walletModifyLogs]);
    },
  });
  return query;
}
