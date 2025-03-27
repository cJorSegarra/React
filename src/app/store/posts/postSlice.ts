import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/post.type";
import { postService } from "../../api/post-service";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
    const response = await postService.getPosts();
    return response;
});

interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch posts";
            });
    },
});

export default postsSlice.reducer;
