import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getTransactions(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/transactions${params}`, "GET");
  return res.data;
}

export function useTransactions(filters: any) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.transactions],
    queryFn: () => getTransactions(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.transactions]);
    },
  });
  return query;
}
