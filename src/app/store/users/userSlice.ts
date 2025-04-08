import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.type";

interface UsersState {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    status: "idle",
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUserLocally: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        updateUserLocally: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            );
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUserLocally: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },

        setLoading: (state) => {
            state.status = "loading";
        },
        setSucceeded: (state) => {
            state.status = "succeeded";
        },
        setFailed: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        },
        resetStatus: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
});

export const {
    addUserLocally,
    updateUserLocally,
    deleteUserLocally,
    setLoading,
    setSucceeded,
    setFailed,
    resetStatus,
} = usersSlice.actions;

export default usersSlice.reducer;
