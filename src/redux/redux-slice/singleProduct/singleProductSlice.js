import {createSlice} from "@reduxjs/toolkit";
import {isError} from "../../../utils/utilStore";
import {getSingleProductThunk} from "../../redux-thunk/singleProduct-thunk/getSingleProductThunk";

const initialState = {
    singleProduct: {},
    isLoading: false,
    error: null
}
const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {
        setProductState: (state, action) => {
            state.singleProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.isLoading = false;
        })

        builder.addCase(getSingleProductThunk.pending, state => {
            state.error = null;
            state.isLoading = true;
        })

        builder.addMatcher(isError, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
    }
})

export const {setProductState} = singleProductSlice.actions;
export default singleProductSlice.reducer;
