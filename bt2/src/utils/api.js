import productsData from '../data/products.json';

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, 500);
  });
};
