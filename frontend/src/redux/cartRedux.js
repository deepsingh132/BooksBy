import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      // Find the index of the product to remove
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      // If the product is found, remove it from the cart
      if (index !== -1) {
        state.quantity -= 1;
        state.total -=
          state.products[index].price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
    },
    removeAllProducts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    // If the total is less than 0, set it to 0
    updateTotal: (state) => {
      if (state.total < 0 || state.quantity < 0 || state.products.length < 0 ) {
        state.total = 0;
      }
    },
    /**
     * TODO: Fetch cart data from the server and update the cart state
     */
    setCartData: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    }
  },
});

export const { addProduct, removeProduct, removeAllProducts, updateTotal } = cartSlice.actions;

export const updateTotalThunk = () => (dispatch) => {
  dispatch(updateTotal());
};

export const setCartData = (data) => (dispatch) => {
  const products = data.products.map((product) => ({
    id: product.productId,
    quantity: product.quantity,
    // add other fields
  }));
  const quantity = data.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const total = data.products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  dispatch(cartSlice.actions.setCartData({ products, quantity, total }));
};

export default cartSlice.reducer;
