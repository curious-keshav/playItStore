import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SignIn from './SignIn/SignIn';

const Navbar = ({ setSearchQuery, cartItems }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(cartItems?.length);

    useEffect(() => {
        setCartCount(cartItems?.length);
    }, [cartItems])

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleInputFocus = () => {
        navigate('/products');
    };

    return (
        <nav className="px-6 py-4 bg-[#0f0f0f] shadow-lg rounded-b-xl w-full">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="invert h-10 object-contain scale-150 ml-8"
                    />
                </Link>

                <div className="lg:flex-1 mx-4 max-w-lg hidden md:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products"
                            onFocus={handleInputFocus}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition duration-300"
                        />
                        <span className="absolute left-3 top-3 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6 text-white text-sm">
                    <Link to="/orders" className="hover:text-indigo-300 transition duration-200 hover:underline">
                        Orders
                    </Link>
                    <SignIn />
                    <Link to="/cart">
                        <span className="relative hover:text-indigo-300 transition duration-200 cursor-pointer">
                            <FaShoppingCart className="text-2xl" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl focus:outline-none">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 text-white text-sm px-6">
                    <Link to="/orders" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition duration-200">
                        Returns & Orders
                    </Link>
                    <Link to="/signin" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition duration-200">
                        Sign In
                    </Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-teal-300 transition duration-200">
                        <FaShoppingCart className="text-xl" />
                        Cart ({cartCount})
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
