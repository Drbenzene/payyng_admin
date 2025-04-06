import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getSupport(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/support/${params}`, "GET");
  return res.data;
}

export async function replyMessage(payload: any) {
  const res = await APICall(`/support/reply`, "POST", payload);
  return res.data;
}

export async function resolveTicket(id: string) {
  const res = await APICall(`/support/resolve/${id}`, "PATCH", {});
  return res;
}

export function useSupport(filters: any) {
  const query = useQuery({
    queryKey: [QUERY_KEY.support],
    queryFn: () => getSupport(filters),
  });
  return query;
}
