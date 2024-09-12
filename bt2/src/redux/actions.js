export const TOGGLE_PRODUCT_SELECTION = 'TOGGLE_PRODUCT_SELECTION';
export const UPDATE_PRODUCT_PRICE = 'UPDATE_PRODUCT_PRICE';
export const BULK_UPDATE_STATUS = 'BULK_UPDATE_STATUS';

export const toggleProductSelection = (id) => ({
  type: TOGGLE_PRODUCT_SELECTION,
  payload: id,
});

export const updateProductPrice = (id, price) => ({
  type: UPDATE_PRODUCT_PRICE,
  payload: { id, price },
});

export const bulkUpdateStatus = (status) => ({
  type: BULK_UPDATE_STATUS,
  payload: status,
});
