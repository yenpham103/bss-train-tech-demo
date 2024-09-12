import React from 'react';
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';

const ProductList = ({ tab }) => {
  const products = useSelector((state) => state.products);

  const filteredProducts = products.filter((product) => {
    if (tab === 'All') return true;
    if (tab === 'Included') return product.status === 'Included';
    if (tab === 'Excluded') return product.status === 'Excluded';
    return false;
  });

  return (
    <div className='product-list'>
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
