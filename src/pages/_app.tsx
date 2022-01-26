import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css/bundle";
import "../styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";

import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "../api/fetcher";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "../store/store";

// axios.defaults.baseURL = "https://index-hospitality.herokuapp.com"

export const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SWRConfig
            value={{
              fetcher,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
