import { createSlice } from "@reduxjs/toolkit";

export const panierSlice = createSlice({
    name: "panier",
    initialState: {
        order: [],
        total: 0,
        counter: 1,
        red: false
    },
    reducers: {
        addToBask: (state, action) => {
            const { title, price } = action.payload;
            let prod = state.order.find((value) => {
                return value.title === title;
            });
            if (!prod)
                state.order.push({title, price, quantity: state.counter});
            else
                prod.quantity += state.counter;
            state.total += Number.parseFloat(price * state.counter);
            state.counter = 1;
        },
        removeToBask: (state, action) => {
            let prod = state.order.find((value) => {
                return value.title === action.payload;
            });
            if (prod) {
                if (prod.quantity > 1) {
                    state.total -= prod.price;
                    prod.quantity -= 1;
                }
                else {
                    state.total = state.total - Number(prod.price);
                    state.order = state.order.filter((value) => {
                        return value.title !== action.payload;
                    });
                    if (state.order.length === 0)
                        state.total = 0;
                }
            }
        },
        addProd: (state) => {
            state.counter += 1
        },
        rmProd: (state) => {
            if (state.counter > 1)
                state.counter -= 1
        },
        backHome: (state) => {
            state.counter = 1;
            state.red = !state.red;
        }
    }
});

export const { addToBask, addProd, rmProd, backHome, removeToBask } = panierSlice.actions;

export default panierSlice.reducer;