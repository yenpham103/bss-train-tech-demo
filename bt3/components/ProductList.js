import ProductItem from './ProductItem';

const ProductList = ({
  products,
  onSelect,
  onPriceChange,
  selectedProducts,
}) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onSelect={onSelect}
          onPriceChange={onPriceChange}
          isSelected={selectedProducts.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
