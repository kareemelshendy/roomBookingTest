import axios from "axios";
import { parseCookies } from "nookies";
import { store } from "../store/store";

const instance = axios.create({
  baseURL: "https://index-hospitality.herokuapp.com",
});

instance.interceptors.request.use(
  function (config) {
    if (process.browser) {
      config.headers = {
        ...config.headers,
        "Accept-Language": "ar",
      };
      const { userToken } = parseCookies();
      // const userToken = store.getState().auth.token;
      if (userToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${userToken}`,
        };
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
