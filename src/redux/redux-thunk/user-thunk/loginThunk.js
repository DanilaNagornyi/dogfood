import {createAsyncThunk} from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    'user/loginThunk',
    async function (dataAuth, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const data = await api.login(dataAuth);

            if (data.token) {
                localStorage.setItem('jwt', data.token)
            } else {
                return rejectWithValue(data);
            }
            return fulfillWithValue(data);
        } catch (e) {
            return rejectWithValue(e);
        }
    })
