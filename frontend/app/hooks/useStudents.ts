import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getStudents } from "~/components/table/data";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 1000 * 60,
  });
}

export async function useDeleteStudents(id: number | string) {
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/students/${id}`);
}
