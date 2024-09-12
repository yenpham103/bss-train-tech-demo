const ProductItem = ({ product, onSelect, onPriceChange, isSelected }) => {
  const handlePriceChange = (e) => {
    onPriceChange(product.id, parseFloat(e.target.value));
  };

  return (
    <div className='product-item'>
      <input
        type='checkbox'
        checked={isSelected}
        onChange={() => onSelect(product.id)}
      />
      <img src={product.image} alt={product.name} />
      <span>{product.name}</span>
      <input
        type='number'
        value={product.price}
        onChange={handlePriceChange}
        step='0.01'
      />
    </div>
  );
};

export default ProductItem;
