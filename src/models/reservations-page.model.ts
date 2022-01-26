import { Reservations } from "./reservation.model";

export interface ReservationsPage {
  currentPage: number;
  data: Reservations[]; 
  limit: number;
  pageCount: number;
  totalCount: number;
}
