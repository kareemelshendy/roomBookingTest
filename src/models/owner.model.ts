import { Room } from ".";

export interface Owner {
  stripeCustomerId: string;
  roomCount: number;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage: {
    thumbnail: string;
    original: string;
  };
  favourites: Room[];
  _id: number;
}
