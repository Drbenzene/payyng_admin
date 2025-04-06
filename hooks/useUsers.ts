import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKeys";
import APICall from "@/services/apiCall";
import { stringifyFilter } from "@/utils/helperFunc";

export async function getUsers(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`/user/all${params}`, "GET");
  return res.data;
}

async function getUserDetails(userId: string) {
  const res = await APICall(`/users/${userId}`, "GET");
  return res.data;
}

export function suspendUser(userId: string) {
  return APICall(`/users/suspend/${userId}`, "PATCH", {});
}

export function inviteAdmin(payload: any) {
  return APICall(`/users/invite-admin/`, "POST", payload);
}

export function addNewRole(payload: any) {
  return APICall(`/roles`, "POST", payload);
}

export function updateRole(roleId: string, payload: any) {
  return APICall(`/roles/${roleId}`, "PATCH", payload);
}

export function addNewPermission(payload: any) {
  return APICall(`/roles/permissions`, "POST", payload);
}

export function unsuspendUser(userId: string) {
  return APICall(`/users/unsuspend/${userId}`, "PATCH", {});
}

// export function useGetUserDetails(userId: string) {
//   const query = useQuery({
//     queryKey: [QUERY_KEY.userDetails, userId],
//     queryFn: () => getUserDetails(userId),
//   });
//   return query;
// }

// In your hook file
export function useGetUserDetails(userId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY.userDetails, userId],
    queryFn: () => (userId ? getUserDetails(userId) : Promise.resolve(null)),
    enabled: !!userId, // Only enable the query when userId exists
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

// In your componen
export function useUsers(filters: any) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.users],
    queryFn: () => getUsers(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.users]);
    },
  });
  return query;
}
