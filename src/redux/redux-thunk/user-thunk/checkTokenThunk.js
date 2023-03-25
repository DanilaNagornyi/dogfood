import {createAsyncThunk} from "@reduxjs/toolkit";

export const checkTokenThunk = createAsyncThunk(
    'user/checkTokenThunk',
    async function (dataAuth, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const data = await api.checkToken(dataAuth);
            return fulfillWithValue(data);
        } catch (e) {
            localStorage.removeItem('jwt');
            return rejectWithValue(e);
        }
    })
