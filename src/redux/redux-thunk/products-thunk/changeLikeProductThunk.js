import {createAsyncThunk} from "@reduxjs/toolkit";
import {isLiked} from "../../../utils/products";

export const changeLikeProductThunk = createAsyncThunk(
    'product/changeLikeProductThunk',
    async function (product, {rejectWithValue, fulfillWithValue, dispatch, getState, extra: api}) {
        try {
            const {user: {userInfo}} = getState();
            const liked = isLiked(product.likes, userInfo._id);
            const data = await api.changeLikeProduct(product._id, liked);
            return fulfillWithValue({product: data, liked});
        } catch (e) {
            return rejectWithValue(e);
        }
    })
