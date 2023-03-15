import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllProductsThunk = createAsyncThunk(
    'products/getAllProductsThunk',
    async function (_, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const {user: {userInfo}} = getState();
            const data = await api.getProductList();

            return fulfillWithValue({...data, currentUser: userInfo});
        } catch (e) {
            return rejectWithValue(e);
        }
    })
