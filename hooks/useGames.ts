import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getGames(filters: any) {
  const query = stringifyFilter(filters);
  const res = await APICall(`/draw-type${query}`, "GET");
  return res.data;
}

async function getGamesPerformance(params: any) {
  const query = stringifyFilter(params);
  const res = await APICall(`/draw-type/performance${query}`, "GET");
  return res.data;
}

async function getGameDetails(id: string) {
  const res = await APICall(`/draw-type/${id}`, "GET");
  return res.data;
}

export async function deleteGame(id: string) {
  const res = await APICall(`/draw-type/${id}`, "DELETE", {});
  return res.data;
}

export function useGames(filters: any) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.drawTypes],
    queryFn: () => getGames(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.drawTypes]);
    },
  });
  return query;
}

export function useGameDetails(id: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.drawDetails],
    queryFn: () => getGameDetails(id),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.drawDetails]);
    },
  });
  return query;
}

export function useGamesPerformance(params: any) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.gamePerformance],
    queryFn: () => getGamesPerformance(params),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.gamePerformance]);
    },
  });
  return query;
}
