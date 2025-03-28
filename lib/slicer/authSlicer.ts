import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        },
        loadUser: (state) => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                state.user = JSON.parse(storedUser);
                state.isAuthenticated = true;
            }
        },
    },
});

export const { setUser, logoutUser, loadUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
