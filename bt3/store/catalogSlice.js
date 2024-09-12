import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Định nghĩa API key (trong thực tế, bạn nên lưu key này trong biến môi trường)
const API_KEY = 'your-secret-api-key-1234';

export const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async ({ tab, page, search }) => {
    const response = await fetch(
      `/api/products?tab=${tab}&page=${page}&search=${search}`,
      {
        headers: {
          'X-Api-Key': API_KEY,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    products: [],
    loading: false,
    error: null,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default catalogSlice.reducer;
