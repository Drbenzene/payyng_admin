import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";

async function getConfigs() {
  const res = await APICall(`/site-options`, "GET");
  return res.data;
}

export async function updateConfigs(payload: any) {
  const res = await APICall(`/site-options`, "PATCH", payload);
  return res;
}

export function useConfig() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.content],
    queryFn: () => getConfigs(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.config]);
    },
  });
  return query ?? null;
}
