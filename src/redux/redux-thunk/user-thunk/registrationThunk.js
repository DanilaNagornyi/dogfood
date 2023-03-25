import {createAsyncThunk} from "@reduxjs/toolkit";

export const registrationThunk = createAsyncThunk(
    'user/registrationThunk',
    async function (dataAuth, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const data = await api.register(dataAuth);
            return fulfillWithValue(data);
        } catch (e) {
            return rejectWithValue(e);
        }
    })
