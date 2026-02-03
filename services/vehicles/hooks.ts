import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getSellingVehicleById,
  getSellingVehicles,
  SellingVehicleResponse,
  SellingVehiclesResponse,
} from "./index";

const LIMIT = 10;
const SORT_BY = "createdAt:desc";

export const useSellingVehicles = () => {
  return useInfiniteQuery<SellingVehiclesResponse, Error>({
    queryKey: ["selling-vehicles"],
    queryFn: ({ pageParam }) =>
      getSellingVehicles({ page: pageParam, limit: LIMIT, sortBy: SORT_BY }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      const page = data.page as number;
      const totalPages = data.totalPages as number;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useSellingVehicle = (id: string) => {
  return useQuery<SellingVehicleResponse, Error>({
    queryKey: ["selling-vehicle", id],
    queryFn: () => getSellingVehicleById(id),
    enabled: !!id,
  });
};
