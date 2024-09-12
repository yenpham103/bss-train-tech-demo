import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProductSelection, updateProductPrice } from '../redux/actions';

function ProductList({ activeTab }) {
  const products = useSelector((state) => state.products);
  const selectedProducts = useSelector((state) => state.selectedProducts);
  const dispatch = useDispatch();
  const [editingPrice, setEditingPrice] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'included') return product.status === 'included';
    if (activeTab === 'excluded') return product.status === 'excluded';
    return false;
  });

  const handleCheckbox = (id) => {
    dispatch(toggleProductSelection(id));
  };

  const startEditing = (id, price) => {
    setEditingPrice(id);
    setTempPrice(price.toFixed(2));
  };

  const handlePriceChange = (e) => {
    setTempPrice(e.target.value);
  };

  const confirmPriceChange = (id) => {
    const newPrice = parseFloat(tempPrice);
    if (!isNaN(newPrice) && newPrice >= 0) {
      dispatch(updateProductPrice(id, newPrice));
    }
    setEditingPrice(null);
  };

  const cancelPriceChange = () => {
    setEditingPrice(null);
  };

  return (
    <div className='product-list'>
      {filteredProducts.map((product) => (
        <div key={product.id} className='product-item'>
          <input
            type='checkbox'
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleCheckbox(product.id)}
          />
          <img src={product.image} alt={product.name} />
          <span className='product-name'>{product.name}</span>
          {editingPrice === product.id ? (
            <div className='price-edit'>
              <input
                type='number'
                className='price-input'
                value={tempPrice}
                onChange={handlePriceChange}
                step='0.01'
                min='0'
              />
              <button
                onClick={() => confirmPriceChange(product.id)}
                className='confirm-btn'
              >
                Save
              </button>
              <button onClick={cancelPriceChange} className='cancel-btn'>
                Cancel
              </button>
            </div>
          ) : (
            <span
              className='product-price'
              onClick={() => startEditing(product.id, product.price)}
            >
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className='product-status'>{product.status || 'Not set'}</span>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
