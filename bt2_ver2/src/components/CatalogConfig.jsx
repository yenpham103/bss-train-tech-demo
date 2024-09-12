import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './ProductList';
import BulkActions from './BulkActions';
import { fetchProducts } from '../redux/actions';

function CatalogConfig() {
  const [activeTab, setActiveTab] = useState('all');
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const tabs = ['all', 'included', 'excluded'];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='catalog-config'>
      <div className='tabs'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <BulkActions activeTab={activeTab} />
      <ProductList activeTab={activeTab} />
    </div>
  );
}

export default CatalogConfig;
