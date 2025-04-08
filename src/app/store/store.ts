import { configureStore } from "@reduxjs/toolkit";
import { postApiSlice } from "../api/postApiSlice";
import { commentApiSlice } from "../api/commentApiSlice";
import commentsReducer from "./comments/commentSlice";
import postsReducer from "./posts/postSlice";
import usersReducer from "./users/userSlice";
import userApiSlice from "../api/usersApiSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
        users: usersReducer,
        auth: authReducer,
        [postApiSlice.reducerPath]: postApiSlice.reducer,
        [commentApiSlice.reducerPath]: commentApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApiSlice.middleware,
            commentApiSlice.middleware,
            userApiSlice.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
