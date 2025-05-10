import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './components/ProductListing';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import CartItems from './components/CartItems';
import Home from './components/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="bg-[#0f0f0f] min-h-screen flex flex-col items-center  w-screen">
        <main className="max-w-6xl w-full">
          <Routes>
            <Route
              path="/"
              element={[<Navbar key="navbar" />, <Home key="home" />, <Footer key="footer" />]}
            />
            <Route
              path="/products"
              element={[<Navbar key="navbar" />, <ProductListing key="productlisting" />, <Footer key="footer" />]}
            />
            <Route
              path="/products/:id"
              element={[<Navbar key="navbar" />, <ProductDetail key="productdetail" />, <Footer key="footer" />]} />
            <Route
              path="/cart"
              element={[<Navbar key="navbar" />, <CartItems key="cartitems" />, <Footer key="footer" />]}
            />
            <Route
              path="/admin"
              element={[<AdminDashboard />]}
            />


          </Routes>
        </main>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
