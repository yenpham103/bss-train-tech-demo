import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleProductSelection,
  updateProductStatus,
} from '../store/catalogSlice';
import styles from '../styles/ProductList.module.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, selectedProducts, currentTab } = useSelector(
    (state) => state.catalog
  );

  const filteredProducts = products.filter((product) => {
    if (currentTab === 'ALL') return true;
    return product.status === currentTab.toLowerCase();
  });

  const handleToggleSelection = (productId) => {
    dispatch(toggleProductSelection(productId));
  };

  const handleStatusChange = (productId, newStatus) => {
    dispatch(updateProductStatus({ productId, status: newStatus }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className={styles.productList}>
      {filteredProducts.map((product) => (
        <div key={product.id} className={styles.productRow}>
          <input
            type='checkbox'
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleToggleSelection(product.id)}
            className={styles.checkbox}
          />
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.productPrice}>
            {formatPrice(product.price)}
          </span>
          <select
            value={product.status || ''}
            onChange={(e) => handleStatusChange(product.id, e.target.value)}
            className={styles.statusSelect}
          >
            <option value=''>Not set</option>
            <option value='included'>Included</option>
            <option value='excluded'>Excluded</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
