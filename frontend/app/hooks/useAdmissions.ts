import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAdmission } from "~/components/table/data";

export function useAdmission() {
  return useQuery({
    queryKey: ["admission"],
    queryFn: getAdmission,
    staleTime: 1000 * 60,
  });
}

export async function useDeleteAdmission(id: number | string) {
  return axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admission/${id}`
  );
}
