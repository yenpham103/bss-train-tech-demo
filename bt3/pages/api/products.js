// Định nghĩa API key cố định
const API_KEY = 'your-secret-api-key-1234';

const productsData = [
  {
    id: '1',
    name: 'Smartphone X',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 60022232333,
    status: 'included',
  },
  {
    id: '2',
    name: 'Laptop Pro',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 1.29999e26,
    status: 'included',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 129.992323,
    status: 'included',
  },
  {
    id: '4',
    name: '4K Smart TV',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 79933.99,
    status: null,
  },
  {
    id: '5',
    name: 'Fitness Tracker',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 79.99,
    status: null,
  },
  {
    id: '6',
    name: 'Gaming Console',
    image:
      'https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 399.99,
    status: null,
  },
  {
    id: '7',
    name: 'Digital Camera',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 449.99,
    status: null,
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 89.99,
    status: null,
  },
  {
    id: '9',
    name: 'Tablet Air',
    image:
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 349.99,
    status: null,
  },
  {
    id: '10',
    name: 'Smart Watch',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    price: 199.99,
    status: null,
  },
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Kiểm tra API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  const { tab = 'all', page = 1, search = '' } = req.query;
  const pageSize = 10;

  let filteredProducts = productsData;

  if (tab === 'included') {
    filteredProducts = filteredProducts.filter(
      (product) => product.status === 'included'
    );
  } else if (tab === 'excluded') {
    filteredProducts = filteredProducts.filter(
      (product) => product.status === 'excluded'
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (parseInt(page) - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  res.status(200).json({
    products: paginatedProducts,
    totalPages: Math.ceil(filteredProducts.length / pageSize),
  });
}
