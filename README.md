# 💰 Expense Tracker App

A professional, responsive web application for tracking and analyzing expenses built with React and powered by the DummyJSON API.

## 🚀 Features

- **Real-time Data Fetching**: Fetches product data from the DummyJSON API using Axios
- **Expense Tracking**: Browse and manage all expenses with detailed product information
- **Advanced Filtering**: Search expenses by name or category
- **Smart Sorting**: Sort by price (ascending/descending), rating, or name
- **Comprehensive Summary**: 
  - Total expenses calculation using JavaScript `reduce()`
  - Average expense per item
  - Highest and lowest expenses with details
  - Category-wise breakdown with statistics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI/UX**: Modern interface with smooth animations and intuitive navigation

## 📋 Pages

### Home
Welcome page with an overview of the application's features and getting started information.

### Expenses
Browse all expenses with:
- Real-time search functionality
- Multiple sort options
- Product images and ratings
- Stock information and discount percentages

### Summary
Detailed analytics dashboard showing:
- Total expenses (using reduce function)
- Average expense calculation
- Highest and lowest expenses
- Category-wise expense breakdown
- Expense distribution percentages

### About
Information about the application, technology stack, features, and how to use it.

## 🛠️ Technology Stack

- **React 19.2.0** - UI library
- **React Router DOM 7.13.0** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite 7.2.4** - Build tool
- **CSS3** - Styling with responsive design

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd EXPENSE\ TRACKER
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will open at `http://localhost:5174/`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Key Implementation Details

### Data Calculation with Reduce
The application uses JavaScript's `reduce()` function for all calculations:

```javascript
// Calculate total expenses
export const calculateTotalExpense = (products) => {
  return products.reduce((total, product) => total + product.price, 0);
};

// Get highest priced product
export const getHighestExpense = (products) => {
  return products.reduce((max, product) => 
    product.price > max.price ? product : max
  );
};
```

### API Integration
Uses Axios for fetching data from:
```
https://dummyjson.com/products
```

Example implementation:
```javascript
export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
```

## 🎨 Design Highlights

- **Color Scheme**: Purple gradient theme (#667eea to #764ba2)
- **Typography**: Segoe UI for professional appearance
- **Responsive Grid**: Adapts from multi-column to single column on mobile
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error messages
- **Hover Effects**: Interactive UI with smooth transitions

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with multi-column grids
- **Tablet**: Optimized 2-column layout
- **Mobile**: Single-column layout with adjusted spacing

## 🔐 Features

- **Search Functionality**: Real-time filtering of expenses
- **Sort Options**: Multiple sorting criteria
- **Category Analysis**: Breakdown expenses by category
- **Performance**: Efficient data processing with reduce function
- **Error Handling**: Comprehensive error states

## 📈 Performance Optimizations

- Lazy loading of components
- Efficient state management with hooks
- CSS animations instead of JavaScript
- Image optimization with thumbnails
- Minimal re-renders with proper dependency arrays

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx
│   └── Navigation.css
├── pages/
│   ├── Home.jsx
│   ├── Home.css
│   ├── Expenses.jsx
│   ├── Expenses.css
│   ├── Summary.jsx
│   ├── Summary.css
│   ├── About.jsx
│   └── About.css
├── services/
│   └── expenseService.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## 🚀 Future Enhancements

- Export data to CSV/PDF
- Dark mode toggle
- Data persistence with localStorage
- Budget setting and alerts
- Chart visualizations (pie charts, bar graphs)
- User authentication
- Multiple currency support

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React and Vite**
