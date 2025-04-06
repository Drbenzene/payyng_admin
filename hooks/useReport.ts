import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getReport(params: any) {
  const query = stringifyFilter(params);
  const res = await APICall(`/report${query}`, "GET");
  return res.data;
}

export function useReport(params: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.reports],
    queryFn: () => getReport(params),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.reports]);
    },
  });
  return query;
}
