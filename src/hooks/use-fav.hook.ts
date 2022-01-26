import useSWR from "swr";
import { Owner } from "../models";

export const useFav = (fallbackUser: Owner) => {
  const { data, error } = useSWR<Owner>(`/users/profile`, {
    fallbackData: fallbackUser,
  });

  return {
    fav: data?.favourites,
    isLoading: !data && !error,
    isError: error,
  };
};
