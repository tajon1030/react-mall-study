import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCartItems, postChangeCart } from "../api/cartApi"


export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postCartItemsAsync = createAsyncThunk('postCartItemsAsync', (param) => {
    return postChangeCart(param)
})

const initState = [];

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState : initState,
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                console.log("getCartItemsAsync.fulfilled");
                console.log(action.payload);
                return action.payload;
            })
            .addCase(postCartItemsAsync.fulfilled, (state, action)=> {
                console.log("postCartItemsAsync.fulfilled");

                // 변경된 장바구니의 현재상태
                return action.payload;
            })
    }
})

export default cartSlice.reducer;