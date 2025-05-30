// Redux Imports
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { AuthResponse } from "@/types/authTypes";
export type Role = 'ADMIN' | 'USER' | 'MODERATOR';

// Define user data type
interface UserData {
    email: string;
    role: Role;
    id: string;
    isFirstLogin: boolean;
}

// Define the state shape
interface AuthState {
    userData: UserData | null;
    isUserLoggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
    userData: null,
    isUserLoggedIn: false,
};

// Create the authentication slice
export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isUserLoggedIn = action.payload;

            if (!action.payload) {
                state.userData = null;
            }
        },
        handleLogout: (state) => {
            Object.assign(state, initialState); 
        },
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
            state.isUserLoggedIn = true;
        },
    },
});

// Export individual action creators
export const { setIsUserLoggedIn, setUserData,handleLogout } = authSlice.actions;

// Export the reducer function
export default authSlice.reducer;
