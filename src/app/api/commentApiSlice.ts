import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment, NewComment } from "../types/comment.type";

const API_BASE_URL = "http://localhost:20001";
const TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE3OTUzMzQyMDUsImlhdCI6MTc0MzUwMTcyOCwiYXV0aF90aW1lIjoxNzQzNDk0MjA1LCJqdGkiOiI2YTFmNDJiNC04ZTRiLTRjYzUtYTFkMS1mOTNiOTBjZTA3ZDYiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJhdWQiOlsiZ28tYWlndWEtdGVtcGxhdGUiLCJhY2NvdW50Il0sInN1YiI6IjJlOTk2ZTM0LTQ5ODEtNDIzNy1hOWJhLWRhOGIwYmM2Y2IzNSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImdvLWFpZ3VhLXNvYyIsInNlc3Npb25fc3RhdGUiOiIxNDM2OTllYS1hODUxLTQwYjUtOGZjOC04ZTNlNmU0NjZhZWMiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJnby1haWd1YS10ZW1wbGF0ZSI6eyJyb2xlcyI6WyJBUFBfVEVNUExBVEUiLCJBUFBfVEVNUExBVEVfUFVCTElDX0FQSSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSBnb2FpZ3VhIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJfbmFtZSI6ImNhcmxvcy5qb3JnZUBpZHJpY2EuY29tIiwibmFtZSI6IkNhcmxvcyBKb3JnZSB8IElkcmljYSIsInByZWZlcnJlZF91c2VybmFtZSI6ImNhcmxvcy5qb3JnZUBpZHJpY2EuY29tIiwiZ2l2ZW5fbmFtZSI6IkNhcmxvcyBKb3JnZSB8IiwiZmFtaWx5X25hbWUiOiJJZHJpY2EiLCJlbWFpbCI6ImNhcmxvcy5qb3JnZUBpZHJpY2EuY29tIn0.KvnXTS1-XYG7SUftqEiAIjIG29XD7ezNeTaUPb15JyxDjw-_GE6UsZ1r3lohII7TnuScWtpCb21bDBvo51k4UOqxIsdzFINbv-90v6-KmwdpVWTzekfyiF_qeo51hDR1Cc97Qh_VHqeOfzh7V1l9hPRkBDO37T41DqIz_uwU50haubS6DUE-S72ZcYUmFzRNHmZwNBTZhr15xSyW4DMlH9y7VG_Lgu8QheijAdCocmuSXX3bEoFimgNu9wO35h4BBym5xtQckpQzMtxpVn-vQOjWGzvJsOXYVeatjb6_U5dgdw7y4ahc98SdGyC2R9zYZt8-kUN3LnO8P7IT5IvlYg";

export const commentApiSlice = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${TOKEN}`);
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getComments: builder.query<Comment[], void>({
            query: () => "/comments",
        }),
        getCommentById: builder.query<Comment, number>({
            query: (id) => `/comments/${id}`,
        }),
        getCommentByUserId: builder.query<Comment[], number>({
            query: (userId) => `/comments/byUserId/${userId}`,
        }),
        getCommentByPostId: builder.query<Comment[], number>({
            query: (postId) => `/comments/byPostId/${postId}`,
        }),
        createComment: builder.mutation<Comment, NewComment>({
            query: (comment) => ({
                url: "/comments",
                method: "POST",
                body: comment,
            }),
        }),
        updateComment: builder.mutation<
            Comment,
            { id: number; comment: Partial<Comment> }
        >({
            query: ({ id, comment }) => ({
                url: `/comments/${id}`,
                method: "PUT",
                body: comment,
            }),
        }),
        deleteComment: builder.mutation<void, number>({
            query: (id) => ({
                url: `/comments/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useGetCommentByIdQuery,
    useGetCommentByUserIdQuery,
    useGetCommentByPostIdQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentApiSlice;

export default commentApiSlice;
