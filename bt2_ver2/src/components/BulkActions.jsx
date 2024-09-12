import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductStatus } from '../redux/actions';
import { toast } from 'react-toastify';

function BulkActions({ activeTab }) {
  const selectedProducts = useSelector((state) => state.selectedProducts);
  const dispatch = useDispatch();

  const handleBulkAction = (status) => {
    if (selectedProducts.length > 0) {
      dispatch(updateProductStatus(selectedProducts, status));
      toast.success(
        `${selectedProducts.length} products updated ${status} successfully!`
      );
    } else {
      toast.error('No products selected!');
    }
  };

  return (
    <div className='bulk-actions'>
      <span className='selected-count'>
        {selectedProducts.length} products selected
      </span>
      {(activeTab === 'all' || activeTab === 'excluded') && (
        <button
          onClick={() => handleBulkAction('included')}
          className='bulk-action-btn include'
        >
          Include selected products
        </button>
      )}
      {(activeTab === 'all' || activeTab === 'included') && (
        <button
          onClick={() => handleBulkAction('excluded')}
          className='bulk-action-btn exclude'
        >
          Exclude selected products
        </button>
      )}
    </div>
  );
}

export default BulkActions;
