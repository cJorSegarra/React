import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../types/comment.type";

interface CommentsState {
    comments: Comment[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CommentsState = {
    comments: [],
    status: "idle",
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addCommentLocally: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        updateCommentLocally: (state, action: PayloadAction<Comment>) => {
            const index = state.comments.findIndex(
                (comment) => comment.id === action.payload.id
            );
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
        },
        deleteCommentLocally: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter(
                (comment) => comment.id !== action.payload
            );
        },
    },
});

export const { addCommentLocally, updateCommentLocally, deleteCommentLocally } =
    commentsSlice.actions;

export default commentsSlice.reducer;
