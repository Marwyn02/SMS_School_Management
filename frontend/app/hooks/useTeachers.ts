import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTeachers } from "~/components/table/data";

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
    staleTime: 1000 * 60,
  });
}

export async function useDeleteTeachers(id: string | number) {
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/${id}`);
}
