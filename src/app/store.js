import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptonewsApi } from "../services/cryptonewsApi";
import { cryptohistoryApi } from "../services/cryptohistoryApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptonewsApi.reducerPath]: cryptonewsApi.reducer,
    [cryptohistoryApi.reducerPath]: cryptohistoryApi.reducer,
  },
});
