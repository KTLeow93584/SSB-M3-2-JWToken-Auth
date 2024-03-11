import { createSlice } from '@reduxjs/toolkit';

const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        login: (state, action) => {
            // Debug
            //console.log("[On Login] Payload.", action.payload);

            return {
                user: action.payload.user,
                token: action.payload.token,
            };
        },
        logout: () => {
            // Debug
            //console.log("[On Logout] Payload.", action.payload);

            return {
                user: null,
                token: null
            };
        },
        updateUserProfileData: (state, action) => {
            return {
                user: {
                    username: state.user.username,
                    firstName: action.payload.type.toLowerCase() === "first-name" ? action.payload.data : state.user.firstName,
                    lastName: action.payload.type.toLowerCase() === "last-name" ? action.payload.data : state.user.lastName
                },
                token: state.token,
            };
        },
    }
});

export const { login, logout, updateUserProfileData } = activeUserSlice.actions;

export default activeUserSlice.reducer;