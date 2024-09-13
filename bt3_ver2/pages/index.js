import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setCurrentTab } from '../store/catalogSlice';
import ProductList from '../components/ProductList';
import BulkActions from '../components/BulkActions';
import styles from '../styles/Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((state) => state.catalog);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setProducts(data));
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleTabChange = (tab) => {
    dispatch(setCurrentTab(tab));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Catalog Configuration</h1>
      <div className={styles.tabContainer}>
        {['ALL', 'INCLUDED', 'EXCLUDED'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${styles.tabButton} ${
              currentTab === tab ? styles.active : ''
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <BulkActions />
      <ProductList />
    </div>
  );
};

export default Home;
