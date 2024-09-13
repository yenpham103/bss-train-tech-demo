import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductStatus } from '../store/catalogSlice';
import styles from '../styles/BulkActions.module.css';

const BulkActions = () => {
  const dispatch = useDispatch();
  const { selectedProducts, currentTab } = useSelector(
    (state) => state.catalog
  );

  const handleBulkAction = (status) => {
    dispatch(updateProductStatus({ productIds: selectedProducts, status }));
  };

  return (
    <div className={styles.bulkActions}>
      <span className={styles.selectedCount}>
        {selectedProducts.length} products selected
      </span>
      <div>
        {(currentTab === 'ALL' || currentTab === 'EXCLUDED') && (
          <button
            onClick={() => handleBulkAction('included')}
            className={styles.actionButton}
            disabled={selectedProducts.length === 0}
          >
            Include selected products
          </button>
        )}
        {(currentTab === 'ALL' || currentTab === 'INCLUDED') && (
          <button
            onClick={() => handleBulkAction('excluded')}
            className={styles.actionButton}
            disabled={selectedProducts.length === 0}
          >
            Exclude selected products
          </button>
        )}
      </div>
    </div>
  );
};

export default BulkActions;
