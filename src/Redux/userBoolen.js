import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 'loading' }

const userBoolean = createSlice({
    name: 'userBoolean',
    initialState,
    reducers: {
        changeBooleanTrue(state, payload) {
            state.value = true;
        },
        changeBooleanFalse(state, payload) {
            state.value = false;
        },

    },
})

export const { changeBooleanTrue, changeBooleanFalse } = userBoolean.actions
export default userBoolean.reducer