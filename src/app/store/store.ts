import { configureStore } from "@reduxjs/toolkit";
import { postApiSlice } from "../api/postApiSlice";
import postsReducer from "./posts/postSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        [postApiSlice.reducerPath]: postApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
