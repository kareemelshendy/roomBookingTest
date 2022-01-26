export interface FormValues {
  capacity: {
    value: string;
    label: string;
  };
  nightPrice: string;
  description: string;
  name: string;
  services: string[];
  images: Blob[];
  location: {
    lng: number;
    lat: number;
  };
}
