import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";

async function getWalletStat() {
  const res = await APICall(`/wallet/stats`, "GET");
  return res.data;
}

export async function adminCreditDebitUserWallet(payload: any) {
  const res = await APICall(`/wallet/admin-credit-debit`, "POST", payload);
  return res.data;
}

export function useWalletStats() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.walletStat],
    queryFn: () => getWalletStat(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.walletStat]);
    },
  });
  return query;
}
