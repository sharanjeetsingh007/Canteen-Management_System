import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;

        },

        logout: (state) => {
            state.value = null;
        },

        upload: (state, action) => {
            state.value = action.payload;
        }


    }

})

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;
export const { upload } = userSlice.actions;

export default userSlice.reducer;
