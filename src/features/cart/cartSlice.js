import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  totalItem: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const price = action.payload.pizza.unitPrice;
      const newPizza = action.payload.pizza;
      state.cart = [...state.cart, { ...newPizza, quantity: 1, total: price }];
      state.totalPrice += price;
      state.totalItem += 1;
    },
    increment: (state, action) => {
      const index = state.cart.findIndex(
        (pizza) => pizza.id === action.payload.id,
      );
      const pizza = state.cart[index];

      pizza.quantity += 1;
      pizza.total += pizza.unitPrice;
      state.totalPrice += pizza.unitPrice;
      state.totalItem += 1;
    },

    decrement: (state, action) => {
      const index = state.cart.findIndex(
        (pizza) => pizza.id === action.payload.id,
      );
      const pizza = state.cart[index];
      if (pizza.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== pizza.id);
        state.totalItem = state.cart.reduce(
          (acc, item) => (acc += item.quantity),
          0,
        );
        state.totalPrice = state.cart.reduce(
          (acc, item) => (acc += item.total),
          0,
        );
      } else {
        pizza.quantity -= 1;
        pizza.total -= pizza.unitPrice;
        state.totalPrice -= pizza.unitPrice;
        state.totalItem -= 1;
      }
    },
    deleteCart: (state, action) => {
      const index = state.cart.findIndex(
        (pizza) => pizza.id === action.payload.id,
      );
      const pizza = state.cart[index];
      state.cart = state.cart.filter((item) => item.id !== pizza.id);
      state.totalItem = state.cart.reduce(
        (acc, item) => (acc += item.quantity),
        0,
      );
      state.totalPrice = state.cart.reduce(
        (acc, item) => (acc += item.total),
        0,
      );
    },
    clearCart: () => initialState,
  },
});

export const { addCart, increment, decrement, deleteCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
