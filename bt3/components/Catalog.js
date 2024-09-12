import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './ProductList';
import Pagination from './Pagination';
import Search from './Search';
import {
  fetchProducts,
  updateProductStatus,
  updateProductPrice,
} from '../store/catalogSlice';

const Catalog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { products, loading, error, totalPages } = useSelector(
    (state) => state.catalog
  );

  useEffect(() => {
    dispatch(
      fetchProducts({ tab: activeTab, page: currentPage, search: searchTerm })
    );
  }, [dispatch, activeTab, currentPage, searchTerm]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedProducts([]);
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkAction = (action) => {
    dispatch(
      updateProductStatus({ productIds: selectedProducts, status: action })
    );
    setSelectedProducts([]);
  };

  const handlePriceChange = (productId, newPrice) => {
    dispatch(updateProductPrice({ productId, newPrice }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange('all')}>All</button>
        <button onClick={() => handleTabChange('included')}>Included</button>
        <button onClick={() => handleTabChange('excluded')}>Excluded</button>
      </div>

      <Search onSearch={handleSearch} />

      {selectedProducts.length > 0 && (
        <div>
          <span>{selectedProducts.length} products selected</span>
          {(activeTab === 'all' || activeTab === 'excluded') && (
            <button onClick={() => handleBulkAction('include')}>
              Include selected products
            </button>
          )}
          {(activeTab === 'all' || activeTab === 'included') && (
            <button onClick={() => handleBulkAction('exclude')}>
              Exclude selected products
            </button>
          )}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ProductList
          products={products}
          onSelect={handleProductSelect}
          onPriceChange={handlePriceChange}
          selectedProducts={selectedProducts}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Catalog;
