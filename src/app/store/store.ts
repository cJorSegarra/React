import { configureStore } from "@reduxjs/toolkit";
import { postApiSlice } from "../api/postApiSlice";
import { commentApiSlice } from "../api/commentApiSlice";
import commentsReducer from "./comments/commentSlice";
import postsReducer from "./posts/postSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        [postApiSlice.reducerPath]: postApiSlice.reducer,
        comments: commentsReducer,
        [commentApiSlice.reducerPath]: commentApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApiSlice.middleware,
            commentApiSlice.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;