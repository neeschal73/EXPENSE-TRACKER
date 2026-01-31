import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

// Fetch all products from the API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Calculate total expenses using reduce
export const calculateTotalExpense = (products) => {
  return products.reduce((total, product) => total + product.price, 0);
};

// Get average expense
export const calculateAverageExpense = (products) => {
  if (products.length === 0) return 0;
  return calculateTotalExpense(products) / products.length;
};

// Get highest priced product
export const getHighestExpense = (products) => {
  if (products.length === 0) return null;
  return products.reduce((max, product) => 
    product.price > max.price ? product : max
  );
};

// Get lowest priced product
export const getLowestExpense = (products) => {
  if (products.length === 0) return null;
  return products.reduce((min, product) => 
    product.price < min.price ? product : min
  );
};
