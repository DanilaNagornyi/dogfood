import {createAsyncThunk} from "@reduxjs/toolkit";

export const getUserInfoThunk = createAsyncThunk(
    'user/getUserInfoThunk',
    async function (_, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const data = await api.getUserInfo();
            return fulfillWithValue(data);
        } catch (e) {
            return rejectWithValue(e);
        }
    })
