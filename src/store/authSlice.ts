// Redux Imports
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "@/types/authTypes";

// Define the state shape
interface AuthState {
    userData: UserData | null;
    isUserLoggedIn: boolean;
    associationId: number
}
interface InitialStatePayload {
    userData: UserData;
    associationId: number
}

// Initial state
const initialState: AuthState = {
    userData: null,
    isUserLoggedIn: false,
    associationId: 0
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
        setAssociationId: (state, action: PayloadAction<number>) => {
            state.associationId = action.payload
        },
        setInitialState: (state, action: PayloadAction<InitialStatePayload>) => {
            state.userData = action.payload.userData;
            state.isUserLoggedIn = true;
            state.associationId = action.payload.associationId
        },
    },
});

// Export individual action creators
export const { setIsUserLoggedIn, setInitialState, handleLogout, setAssociationId } = authSlice.actions;

// Export the reducer function
export default authSlice.reducer;
