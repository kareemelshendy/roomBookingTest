import { Room } from ".";

export interface RoomPage {
  data: Room[];
  limit: number;
  totalCount: number;
  currentPage: number;
  pageCount: number;
}
