import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './components/ProductListing';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import CartItems from './components/CartItems';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="bg-[#0f0f0f] min-h-screen flex flex-col items-center  w-screen">

        <main className="max-w-7xl w-full">
          <Routes>
            <Route path="/" element={[<Navbar />,<Home/>, <Footer />]} />
            <Route path="/products" element={[<Navbar />, <ProductListing />, <Footer />]} />
            <Route path="/products/:id" element={[<Navbar />, <ProductDetail />, <Footer />]} />
            <Route path="/cart" element={[<Navbar />, <CartItems />, <Footer />]} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
