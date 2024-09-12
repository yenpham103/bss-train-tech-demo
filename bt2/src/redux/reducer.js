import productsData from '../data/products.json';
import {
  TOGGLE_PRODUCT_SELECTION,
  UPDATE_PRODUCT_PRICE,
  BULK_UPDATE_STATUS,
} from './actions';

const initialState = {
  products: productsData.map((product) => ({ ...product, selected: false })),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PRODUCT_SELECTION:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, selected: !product.selected }
            : product
        ),
      };
    case UPDATE_PRODUCT_PRICE:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, price: action.payload.price }
            : product
        ),
      };
    case BULK_UPDATE_STATUS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.selected
            ? { ...product, status: action.payload, selected: false }
            : product
        ),
      };
    default:
      return state;
  }
};

export default reducer;
