import useSWR from "swr";
import { Service } from "../models";

export const useServices = (fallbackServices: Service[]) => {
  const { data, error } = useSWR<Service[]>("/services", {
    fallbackData: fallbackServices,
  });

  return {
    services: data,
    isLoading: !data && !error,
    isError: error,
  };
};
