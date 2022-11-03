import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptohistoryApiHeaders={
    "X-RapidAPI-Host":'api.coingecko.com'
};

const baseUrl='https://api.coingecko.com/api/v3/coins';

const createRequest = (url) => ({ url, headers: cryptohistoryApiHeaders });

export const cryptohistoryApi = createApi({
    reducerPath: "cryptohistoryApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptohistory: builder.query({
        query: ({coinName,currency,days}) =>
          createRequest(
            `/${coinName}/market_chart?vs_currency=${currency}&days=${days}`
          ),
      }),
    }),
  });

  export const {useGetCryptohistoryQuery}=cryptohistoryApi;