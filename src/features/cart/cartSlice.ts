import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface Pizza {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const initialState = {
  cart: [] as Pizza[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item?.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, clearCart, decreaseItemQuantity, deleteItem, increaseItemQuantity } =
  cartSlice.actions;
export default cartSlice;

export const getCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state: RootState) => state.cart.cart;

export const getCurrentQuantityById = (pizzaId: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0;
