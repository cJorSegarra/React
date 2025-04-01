import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/post.type";
import { postService } from "../../api/postService";

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
    reducers: {
        updatePostLocally: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(
                (post) => post.id === action.payload.id
            );
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePostLocally: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
        addPostLocally: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
    },
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

export const { updatePostLocally, deletePostLocally, addPostLocally } =
    postsSlice.actions;

export default postsSlice.reducer;
