import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";

export async function getContent() {
  const res = await APICall(`/content`, "GET");
  return res.data;
}

export async function saveContent(payload: any) {
  const res = await APICall(`/content`, "POST", payload);
  return res.data;
}

export function useContent() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.content],
    queryFn: () => getContent(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.content]);
    },
  });
  return query;
}
