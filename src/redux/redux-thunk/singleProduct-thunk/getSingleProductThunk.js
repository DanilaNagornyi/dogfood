import {createAsyncThunk} from "@reduxjs/toolkit";

export const getSingleProductThunk = createAsyncThunk(
    'singleProduct/getSingleProductThunk',
    async function (productId, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const token = localStorage.getItem('jwt');
            const data = await api.getProductById(productId, token);

            return fulfillWithValue(data);
        } catch (e) {
            return rejectWithValue(e);
        }
    })
