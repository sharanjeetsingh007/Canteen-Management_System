import { createSlice } from "@reduxjs/toolkit";



export const sidebarSlice = createSlice({
    name: "sidebarValue",
    initialState: {
        value: false
    },
    reducers: {
        toggle: (state, action) => {
            state.value = !state.value;

        },




    }

})

export const { toggle } = sidebarSlice.actions;


export default sidebarSlice.reducer;
