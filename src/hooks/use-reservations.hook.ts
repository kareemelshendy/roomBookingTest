import useSWR from "swr";
import { ReservationsPage } from "../models";

export const useReservations = (pageNumber: string, status: string = "", fallbackData?: ReservationsPage) => {
  const { data, error } = useSWR<ReservationsPage>(`/bookings/clients?limit=16&pageNumber=${pageNumber}&status=${status}`, {
    fallbackData: fallbackData ? fallbackData : undefined,
  });

  return {
    reservationsPage: data,
    isLoading: !data && !error,
    isError: error,
  };
};
