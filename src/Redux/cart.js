import { createSlice, current } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        quantity: 0,
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.quantity = action.payload;

        },

        minusToCart: (state) => {
            if (state.quantity <= 0) {
                state.quantity = 0;
            } else {
                state.quantity -= 1;
            }
        },

        addProductsToCart: (state, { payload }) => {
            const existingItem = state.cartItems.find((item) => item.UserId == payload.UserId)

            if (existingItem) {

                const sameProductID = existingItem[0].Orders.find((item) => item.ProductId == payload[0].Orders[0].ProductId);

                if (sameProductID) {
                    sameProductID.Quantity += payload[0].Orders[0].Quantity;

                } else {
                    existingItem[0].Orders.push(payload[0].Orders[0]);

                }

            } else {

                state.cartItems.push(payload)
            }

        },

        updateProductsToCart: (state, { payload }) => {

            let existingItem = state.cartItems[0][0].Orders.find((item) => item.ProductId == payload[0].Orders[0].ProductId)

            if (existingItem) {
                existingItem.Quantity = payload[0].Orders[0].Quantity
                existingItem.Total = payload[0].Orders[0].Total
            }
        },
        deleteProductsToCart: (state, { payload }) => {
            let existingItem = state.cartItems[0][0].Orders.filter((item) => item.ProductId !== payload[0].Orders[0].ProductId)
            state.cartItems[0][0].Orders = existingItem

        },

        emptyCart: (state, { payload }) => {
            state.cartItems = []
            state.quantity = 0

        }
    }

})

export const { addToCart } = cartSlice.actions;
export const { minusToCart } = cartSlice.actions;
export const { addProductsToCart } = cartSlice.actions;
export const { updateProductsToCart } = cartSlice.actions;
export const { deleteProductsToCart } = cartSlice.actions;
export const { emptyCart } = cartSlice.actions;


export default cartSlice.reducer;
