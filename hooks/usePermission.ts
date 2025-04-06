import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";

async function getPermission() {
  const res = await APICall(`/roles/permissions`, "GET");
  return res.data;
}

export function usePermission() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.permissions],
    queryFn: () => getPermission(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.permissions]);
    },
  });
  return query;
}
