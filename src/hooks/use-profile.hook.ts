import useSWR from "swr";
import { Owner } from "../models";

export const useProfile = (id: string, fallbackUser: Owner) => {
  const { data, error } = useSWR(`/users/${id}`, {
    fallbackData: fallbackUser,
  });
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
