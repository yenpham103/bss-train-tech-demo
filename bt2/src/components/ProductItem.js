import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleProductSelection, updateProductPrice } from '../redux/actions';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className='product-item'>
      <input
        type='checkbox'
        checked={product.selected}
        onChange={() => dispatch(toggleProductSelection(product.id))}
      />
      <img src={product.image} alt={product.name} />
      <span className='product-name'>{product.name}</span>
      <input
        type='number'
        value={product.price}
        onChange={(e) =>
          dispatch(updateProductPrice(product.id, parseFloat(e.target.value)))
        }
      />
    </div>
  );
};

export default ProductItem;
