import { useFetchData } from "@/hooks/useFetchData";

export const PAYMENT_RECORDS = "payment-records";

export const useGetPaymentRecords = ({ page }: { page: number }) => {
  const endPoint = `/appointments/doctor/all?p=${page}&limit=10`;

  return useFetchData<any>({
    url: endPoint,
    querykey: [PAYMENT_RECORDS, page],
  });
};