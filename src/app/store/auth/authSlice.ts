import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    id: number | null;
    name: string;
}

const initialState: AuthState = {
    id: localStorage.getItem("userId")
        ? Number(localStorage.getItem("userId"))
        : null,
    name: localStorage.getItem("userName") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: number; name: string }>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            localStorage.setItem("userId", String(action.payload.id));
            localStorage.setItem("userName", action.payload.name);
        },
        logout: (state) => {
            state.id = null;
            state.name = "";
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
