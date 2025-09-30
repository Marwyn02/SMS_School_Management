import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getClasses } from "~/components/table/data";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
    staleTime: 1000 * 60,
  });
}

export async function useDeleteClasses(id: number | string) {
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${id}`);
}
