import {createSlice} from "@reduxjs/toolkit";
import {isError} from "../../../utils/utilStore";
import {getUserInfoThunk} from "../../redux-thunk/user-thunk/getUserInfoThunk";
import {registrationThunk} from "../../redux-thunk/user-thunk/registrationThunk";
import {loginThunk} from "../../redux-thunk/user-thunk/loginThunk";
import {checkTokenThunk} from "../../redux-thunk/user-thunk/checkTokenThunk";

const initialState = {
    isAuth: false,
    userInfo: {},
    isRegistrationSuccess: false,
    isLoading: false,
    error: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = {};
            state.isAuth = false;
            localStorage.removeItem('jwt');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isLoading = false;
        })

        builder.addCase(getUserInfoThunk.pending, state => {
            state.error = null;
            state.isLoading = true;
        })

        builder.addCase(registrationThunk.fulfilled, (state, action) => {
            if (Object.keys(action.payload).length > 0) {
                state.isRegistrationSuccess = true;
                state.isLoading = false;
            }
        })

        builder.addCase(registrationThunk.pending, state => {
            state.error = null;
            state.isLoading = true;
        })

        builder.addCase(loginThunk.fulfilled, (state, action) => {
            if (Object.keys(action.payload).length > 0) {
                state.userInfo = action.payload.data;
                state.isLoading = false;
                if (action.payload.token) {
                    state.isAuth = true;
                }
            }
        })

        builder.addCase(loginThunk.pending, state => {
            state.error = null;
            state.isLoading = true;
        })

        builder.addCase(checkTokenThunk.fulfilled, (state, action) => {
            if (Object.keys(action.payload).length > 0) {
                state.userInfo = action.payload;
                state.isAuth = true;
                state.isLoading = false;
            }
        })

        builder.addCase(checkTokenThunk.pending, state => {
            state.error = null;
            state.isLoading = true;
        })

        builder.addMatcher(isError, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            // state.isAuth = false;

        })
    }
})

export const {logout} = userSlice.actions;

export default userSlice.reducer;
