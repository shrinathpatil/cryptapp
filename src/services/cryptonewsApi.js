import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptonewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "d43a587289msh496323c53005b04p1620f1jsne7b4c97a3a85",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptonewsHeaders });

export const cryptonewsApi = createApi({
  reducerPath: "cryptonewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptonews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const {useGetCryptonewsQuery}=cryptonewsApi;