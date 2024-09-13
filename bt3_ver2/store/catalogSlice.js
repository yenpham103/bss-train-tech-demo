import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProducts: [],
  currentTab: 'ALL',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    toggleProductSelection: (state, action) => {
      const productId = action.payload;
      if (state.selectedProducts.includes(productId)) {
        state.selectedProducts = state.selectedProducts.filter(
          (id) => id !== productId
        );
      } else {
        state.selectedProducts.push(productId);
      }
    },
    updateProductStatus: (state, action) => {
      const { productIds, status } = action.payload;
      state.products = state.products.map((product) =>
        productIds.includes(product.id) ? { ...product, status } : product
      );
      state.selectedProducts = [];
    },
    updateProductStatus: (state, action) => {
      const { productIds, status } = action.payload;
      state.products = state.products.map((product) =>
        productIds.includes(product.id) ? { ...product, status } : product
      );
      state.selectedProducts = [];
      // Cập nhật currentTab nếu đang ở tab ALL
      if (state.currentTab === 'ALL') {
        state.currentTab = status.toUpperCase();
      }
    },
  },
});

export const {
  setProducts,
  setCurrentTab,
  toggleProductSelection,
  updateProductStatus,
  updateProductPrice,
} = catalogSlice.actions;
export default catalogSlice.reducer;
