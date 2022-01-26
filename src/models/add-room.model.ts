export interface AddRoomModel {
  capacity: string;
  description: string | null;
  images: Blob[];
  latitude: string;
  longitude: string;
  name: string;
  nightPrice: string;
  service: string[];
}
