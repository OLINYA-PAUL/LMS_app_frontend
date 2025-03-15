import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: ({ type }) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editHeroData: builder.mutation({
      query: ({
        type,
        image,
        title,
        subTitle,
      }: {
        type: string;
        image: string;
        title: string;
        subTitle: string;
      }) => ({
        url: `update-layout`,
        method: "PUT",
        body: { type, image, title, subTitle },
        credentials: "include" as const,
      }),
    }),
    editQuestionAndAnswerData: builder.mutation({
      query: ({
        type,
        faq,
      }: {
        type: string;
        faq: Array<{ question: string; answer: string }>;
      }) => ({
        url: `update-layout`,
        method: "PUT",
        body: { type, faq },
        credentials: "include" as const,
      }),
    }),
    updateCategories: builder.mutation({
      query: ({
        type,
        categories,
      }: {
        type: string;
        categories: Array<{ title: string }>;
      }) => ({
        url: `update-layout`,
        method: "PUT",
        body: { type, categories },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetHeroDataQuery,
  useEditHeroDataMutation,
  useEditQuestionAndAnswerDataMutation,
  useUpdateCategoriesMutation,
} = layoutApi;
