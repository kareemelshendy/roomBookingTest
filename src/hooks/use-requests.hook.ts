import useSWR from "swr";
import { ReservationsPage } from "../models";

export const useRequests = (pageNumber: string, status: string, fallbackData?: ReservationsPage) => {
  const { data, error } = useSWR<ReservationsPage>(`/bookings/providers?limit=16&pageNumber=${pageNumber}&status=${status}`, {
    fallbackData: fallbackData ? fallbackData : undefined,
  });

  return {
    requestsPage: data,
    isLoading: !data && !error,
    isError: error,
  };
};
