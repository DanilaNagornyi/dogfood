import {configureStore} from '@reduxjs/toolkit'
import productsReducer from "./redux-slice/products/productsSlice";
import api from "../utils/api";
import userReducer from "./redux-slice/user/userSlice";
import singleProductReducer from "./redux-slice/singleProduct/singleProductSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        singleProduct: singleProductReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: api,
        }
    })
})

export default store;
