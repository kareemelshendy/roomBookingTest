import useSWR from "swr";

import { RoomPage } from "../models/roomPage.model";

export const useRooms = (pageNumber?: string, fallbackPage?: RoomPage, profileId: string = "", latitude: number = 0, longitude: number = 0, minNightPrice: number = 0, maxNightPrice: number = 0, service?: string[]) => {
  const { data, error, mutate } = useSWR<RoomPage>(`/rooms?${pageNumber ? `pageNumber=${pageNumber}` : ""}${profileId ? `&owners=${profileId}` : ""}&limit=16${latitude ? `&latitude=${latitude}` : ""}${longitude ? `&longitude=${longitude}` : ""}${minNightPrice ? `&minNightPrice=${minNightPrice}` : ""}${maxNightPrice ? `&maxNightPrice=${maxNightPrice}` : ""}${service ? `&service=${service}` : ""}`, { fallbackData: fallbackPage });
  return {
    roomsPage: data,
    isLoading: !data && !error,
    isError: error,
  };
};
