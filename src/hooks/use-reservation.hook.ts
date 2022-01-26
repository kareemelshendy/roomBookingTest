import useSWR from "swr";
import { Reservations } from "../models";

export const useReservation = (id: string, falbackReservation: Reservations) => {
  const { data, error } = useSWR<Reservations>(`/bookings/${id}`, {
    fallbackData: falbackReservation,
  });

  return {
    reservation: data,
    isLoading: !data && !error,
    isError: error,
  };
};
