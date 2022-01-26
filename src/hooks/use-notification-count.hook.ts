import useSWR from "swr";

export const useNotificationsCount = () => {
  const { data, error } = useSWR(`/notifications/count`);

  return {
    count: data,
    isLoading: !data && !error,
    isError: error,
  };
};
