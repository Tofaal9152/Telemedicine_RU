import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { request } from "../lib/request";

type FetchArgs<T> = {
  url: string;
  querykey: QueryKey;
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
};

export function useFetchData<T>({
  url,
  querykey,
  options,
}: FetchArgs<T>): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: querykey,
    queryFn: () => request.get<T>(url),
    ...options,
  });
}
