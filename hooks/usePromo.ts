import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

async function getPromos(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/promo${params}`, "GET");
  return res.data;
}

async function getPromoRedeemsById(id: string, filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/promo/redeems/${id}${params}`, "GET");
  return res.data;
}

export async function getAllReferrals(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/promo/referrals${params}`, "GET");
  return res.data;
}

export async function getAllPromoRedeems(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/promo/redeems${params}`, "GET");
  return res.data;
}

export async function createPromo(payload: any) {
  const res = await APICall(`/promo`, "POST", payload);
  return res.data;
}

export async function updatePromo(id: string, payload: any) {
  const res = await APICall(`/promo/${id}`, "PUT", payload);
  return res;
}

export function updatePromoStatus(promoId: string, payload: any) {
  return APICall(`/promo/status/${promoId}`, "PATCH", payload);
}

async function promoDetails(id: string) {
  const res = await APICall(`/promo/${id}`, "GET");
  return res.data;
}

export function usePromo(filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.promos],
    queryFn: () => getPromos(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.promos]);
    },
  });
  return query;
}

export function usePromoRedeem(id: string, filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.promoRedeems],
    queryFn: () => getPromoRedeemsById(id, filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.promoRedeems]);
    },
  });
  return query;
}

export function useAllPromoRedeems(filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.allPromoRedeems],
    queryFn: () => getAllPromoRedeems(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.allPromoRedeems]);
    },
  });
  return query;
}

export function useGetAllReferrals(filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.allReferrals],
    queryFn: () => getAllReferrals(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.allReferrals]);
    },
  });
  return query;
}

export function usePromoDetails(id: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.promoDetails],
    queryFn: () => promoDetails(id),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.promoDetails]);
    },
  });
  return query;
}
