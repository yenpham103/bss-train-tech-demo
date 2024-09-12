import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bulkUpdateStatus } from '../redux/actions';
import ProductList from './ProductList';

const CatalogConfiguration = () => {
  const [activeTab, setActiveTab] = useState('All');
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const selectedCount = products.filter((p) => p.selected).length;

  const handleBulkAction = (status) => {
    dispatch(bulkUpdateStatus(status));
  };

  return (
    <div>
      <div className='tab-buttons'>
        {['All', 'Included', 'Excluded'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedCount > 0 && (
        <div className='bulk-actions'>
          <span>{selectedCount} products selected</span>
          <div>
            {(activeTab === 'All' || activeTab === 'Excluded') && (
              <button
                className='bulk-action-button'
                onClick={() => handleBulkAction('Included')}
              >
                Include selected products
              </button>
            )}
            {(activeTab === 'All' || activeTab === 'Included') && (
              <button
                className='bulk-action-button'
                onClick={() => handleBulkAction('Excluded')}
              >
                Exclude selected products
              </button>
            )}
          </div>
        </div>
      )}
      <ProductList tab={activeTab} />
    </div>
  );
};

export default CatalogConfiguration;
