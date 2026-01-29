import { useInfiniteQuery } from "@tanstack/react-query";
import { getSellingVehicles, SellingVehiclesResponse } from "./index";

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
      const { page, totalPages } = data;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
