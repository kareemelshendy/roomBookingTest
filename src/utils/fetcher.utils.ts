import axios from "axios";

export const fetcher = (url: string, token: string = "") => {
  return axios
    .get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      baseURL: process.env.NEXT_PUBLIC_BASE_URI,
    })
    .then((res) => res.data);
};
