import { Notification } from "./notification.model";

export interface NotificationsPage {
  cuurentPage: number;
  limit: number;
  data: Notification[];
  pageCount: number;
  totalCount: number;
}
