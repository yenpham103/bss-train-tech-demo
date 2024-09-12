const initialState = {
  products: [],
  selectedProducts: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_PRODUCTS_STATUS':
      return {
        ...state,
        products: state.products.map((product) => {
          const updatedProduct = action.payload.find(
            (p) => p.id === product.id
          );
          return updatedProduct ? { ...product, ...updatedProduct } : product;
        }),
        selectedProducts: [],
      };
    case 'TOGGLE_PRODUCT_SELECTION':
      return {
        ...state,
        selectedProducts: state.selectedProducts.includes(action.payload)
          ? state.selectedProducts.filter((id) => id !== action.payload)
          : [...state.selectedProducts, action.payload],
      };
    case 'UPDATE_PRODUCT_PRICE':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, price: action.payload.price }
            : product
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
