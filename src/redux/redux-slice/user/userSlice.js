import {createSlice} from "@reduxjs/toolkit";
import {isError} from "../../../utils/utilStore";
import {getUserInfoThunk} from "../../redux-thunk/user-thunk/getUserInfoThunk";

const initialState = {
    userInfo: {},
    isLoading: false,
    error: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isLoading = false;
        })

        builder.addCase(getUserInfoThunk.pending, state => {
            state.error = null;
            state.isLoading = true;
        })

        builder.addMatcher(isError, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
    }
})


export default userSlice.reducer;
