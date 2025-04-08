import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/post.type";

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
});

export const { updatePostLocally, deletePostLocally, addPostLocally } =
    postsSlice.actions;

export default postsSlice.reducer;