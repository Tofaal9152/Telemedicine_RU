import { useFetchData } from "@/hooks/useFetchData";
import { makeEndpoint } from "@/utils/makeEndpoint";

export const SEARCH_DOCTOR = "search-doctor";
export const useGetSearchResults = ({
  query,
  specialty,
  page,
}: {
  query: string;
  specialty: string;
  page: number;
}) => {
  const endPoint = makeEndpoint(`/public/doctors/approved`, {
    query,
    specialty,
    page: page,
    limit: 10,
  });
  return useFetchData<any>({
    url: endPoint,
    querykey: [SEARCH_DOCTOR, query, specialty, page],
  });
};
//
// Specializations
const SEARCH_SPECIALIZATIONS = "search-specializations";
export const useGetSpecializations = () => {
  return useFetchData<any>({
    url: `/public/all-doctors-specialty`,
    querykey: [SEARCH_SPECIALIZATIONS],
  });
};
