import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductFilters from './FilterProduct';
import { fetchAllProducts } from './Firebase/products';

const ProductListing = ({ searchQuery }) => {
    const [productData, setProductData] = useState([]);
    const [filters, setFilters] = useState({
        sortOrder: 'lowToHigh',
        priceRange: [0, 10000],
        categories: [],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    // Fetch products on component mount
    useEffect(() => {
        const getProduct = async () => {
            await fetchAllProducts().then((res) => setProductData(res));
        };
        getProduct();
    }, []);

    // Handle filter changes
    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    // Filter products based on search query and filters
    const filteredData = productData.filter((product) => {
        const isInPriceRange =
            product.availableColors[0].price >= filters.priceRange[0] &&
            product.availableColors[0].price <= filters.priceRange[1];
        const isInCategory =
            filters.categories.length === 0 ||
            product.categories.some((category) => filters.categories.includes(category));

        const isInSearchQuery =
            product?.productName?.toLowerCase().includes(searchQuery) ||
            product?.productDescription?.toLowerCase().includes(searchQuery);

        return isInPriceRange && isInCategory && isInSearchQuery;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Sorting based on price
    if (filters.sortOrder === 'lowToHigh') {
        paginatedData.sort((a, b) => a.availableColors[0].price - b.availableColors[0].price);
    } else if (filters.sortOrder === 'highToLow') {
        paginatedData.sort((a, b) => b.availableColors[0].price - a.availableColors[0].price);
    }

    return (
        <div className="min-h-screen py-6 px-4 md:px-6 text-white font-sans flex flex-col gap-16">
            <div className="relative flex justify-center items-center h-32 md:h-64 bg-fixed bg-top bg-cover" style={{ backgroundImage: "url('./listingBg.jpeg')" }}>
                <div className="bg-black h-full w-full absolute bg-opacity-70"></div>
                <h1 className="text-3xl md:text-6xl font-extrabold text-white z-10 px-6 py-3">JUST BUY IT.</h1>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:gap-8">
                <ProductFilters onFilterChange={handleFilterChange} />

                <div className="col-span-3">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight text-white neon-glow">
                        🎮 Gaming Console & Accessories
                    </h1>

                    <p className="text-gray-400 text-sm mb-4">
                        Showing {startIndex + 1}-{Math.min(startIndex + paginatedData.length, filteredData.length)} of {filteredData.length} results
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedData.map((product) => (
                            <div key={product.productId} className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.03] transform transition duration-300 border border-transparent hover:border-indigo-600">
                                <img src={product.productImg} alt={product.productName} className="w-full h-52 object-contain rounded-xl mb-4 bg-white p-2" />
                                <h2 className="text-xl sm:text-lg font-semibold">{product.productName}</h2>
                                <p className="text-gray-400 text-sm mt-1">Variants: {product.availableColors.length}</p>

                                <div className="mt-2">
                                    <span className="text-indigo-600 text-lg font-bold mr-2">
                                        ₹{product.availableColors[0].price}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                                </div>

                                <div className="mt-4">
                                    <Link to={`/products/${product.productId}`} className="text-sm text-indigo-400 hover:text-indigo-600">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="bg-indigo-500 px-4 py-2 rounded-xl text-white text-sm">
                            Prev
                        </button>
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="bg-indigo-500 px-4 py-2 rounded-xl text-white text-sm">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
