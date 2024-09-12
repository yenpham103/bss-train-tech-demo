export const updateProductStatus = (ids, status) => {
  return async (dispatch) => {
    try {
      const updatePromises = ids.map((id) =>
        fetch(`http://localhost:4000/products/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }).then((response) => response.json())
      );

      const updatedProducts = await Promise.all(updatePromises);

      dispatch({
        type: 'UPDATE_PRODUCTS_STATUS',
        payload: updatedProducts,
      });
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };
};

export const toggleProductSelection = (id) => ({
  type: 'TOGGLE_PRODUCT_SELECTION',
  payload: id,
});

export const updateProductPrice = (id, price) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProduct = await response.json();

      dispatch({
        type: 'UPDATE_PRODUCT_PRICE',
        payload: updatedProduct,
      });
    } catch (error) {
      console.error('Error updating product price:', error);
      // You might want to dispatch an error action here
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };
};
