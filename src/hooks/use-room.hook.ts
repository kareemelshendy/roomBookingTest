import useSWR from "swr";
import { Room } from "../models";

export const useRoom = (roomId: string, fallbackRoom: any) => {
  const { data, error } = useSWR<Room>(`/rooms/${roomId}`, {
    fallbackData: fallbackRoom,
  });

  return {
    room: data,
    isLoading: !data && !error,
    isError: error,
  };
};
