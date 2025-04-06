import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";

async function getRoles() {
  const res = await APICall(`/roles`, "GET");
  return res.data;
}

export async function deleteRole(id: string) {
  const res = await APICall(`/roles/${id}`, "DELETE", {});
  return res;
}

export function useRole() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.roles],
    queryFn: () => getRoles(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.roles]);
    },
  });
  return query;
}
