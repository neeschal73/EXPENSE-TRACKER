# 💰 Expense Tracker Application

A **complete, production-ready expense tracking application** built with React, Vite, and modern web technologies. Track income, expenses, manage budgets, and visualize your finances with charts and reports.

## 🌟 Features Implemented

### ✅ User Management
- User registration with password validation
- Secure login system
- Logout functionality
- Per-user data isolation
- Session persistence

### ✅ Transaction Management
- **Add transactions**: Income and expenses
- **Edit transactions**: Inline editing with cancellation
- **Delete transactions**: One-click removal
- **Categories**: 7 pre-defined categories + extensible
- **Date selection**: Calendar date picker
- **Descriptions**: Add notes to transactions
- **Type support**: Income and expense tracking

### ✅ Dashboard
- Summary cards showing Total Income, Expenses, Balance, and Count
- Budget tracking by category
- Progress indicators with percentages
- Overspending alerts

### ✅ Financial Reports
- Pie chart (expenses by category)
- Bar chart (12-month trends)
- Statistics and category breakdown

### ✅ Search & Filtering
- Real-time search (description, category, amount)
- Filter by type and category
- Sort options (latest, highest, lowest)

### ✅ Budgeting
- Set budget limits per category
- Real-time tracking
- Progress visualization
- Overspending detection

### ✅ UI/UX Features
- Dark/Light mode toggle
- Responsive design (mobile+desktop)
- Professional styling
- Icons and visual indicators

### ✅ Data Management
- CSV export
- LocalStorage persistence
- Per-user data isolation
- Auto-save

### ✅ Calculations Using `reduce()`
All aggregations use JavaScript `reduce()` as specified:
- Total income/expense
- Category totals
- Monthly calculations
- Budget computations

### ✅ API Integration
- DummyJSON product integration
- Axios HTTP client
- Error handling

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
