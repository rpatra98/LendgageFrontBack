import { createSlice } from '@reduxjs/toolkit';

let key = 0;

const userSlice = createSlice({
    name:"user",
    initialState:{key},
    reducers:{
        nextPage(state){
            state.key = state.key + 1;
        },
        previousPage(state){
            state.key = state.key - 1;
        },
        checkAuth(state, action){},
    },
});

export default userSlice.reducer;
export const { nextPage } = userSlice.actions;
export const { previousPage } = userSlice.actions;