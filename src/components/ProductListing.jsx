import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_DATA } from '../api/DummyData';
import ProductFilters from './FilterProduct';

const ProductListing = () => {
    const [filters, setFilters] = useState({
        sortOrder: 'lowToHigh',
        priceRange: [0, 10000],
        categories: [],
    });

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    const filteredData = DUMMY_DATA.filter((product) => {
        const isInPriceRange =
            product.availableColors[0].price >= filters.priceRange[0] &&
            product.availableColors[0].price <= filters.priceRange[1];
        const isInCategory =
            filters.categories.length === 0 ||
            product.categories.some((category) => filters.categories.includes(category));

        return isInPriceRange && isInCategory;
    });

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (filters.sortOrder === 'lowToHigh') {
        paginatedData.sort((a, b) => a.availableColors[0].price - b.availableColors[0].price);
    } else if (filters.sortOrder === 'highToLow') {
        paginatedData.sort((a, b) => b.availableColors[0].price - a.availableColors[0].price);
    }

    return (
        <div className=" min-h-screen py-6 px-4 md:px-6 text-white font-sans flex flex-col gap-16">
            <div
                className="relative flex justify-center items-center h-32 md:h-64 bg-fixed  bg-top bg-cover "
                style={{ backgroundImage: "url('./listingBg.jpeg')" }}
            >
                <div className='bg-black h-full w-full absolute bg-opacity-70'></div>
                <h1 className="text-3xl md:text-6xl font-extrabold text-white z-10  px-6 py-3  ">
                    JUST BUY IT.
                </h1>
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
                            <div
                                key={product.productId}
                                className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.03] transform transition duration-300 border border-transparent hover:border-indigo-600"
                            >
                                <img
                                    src={product.productImg}
                                    alt={product.productName}
                                    className="w-full h-52 object-contain rounded-xl mb-4 bg-white p-2"
                                />
                                <h2 className="text-xl sm:text-lg font-semibold">{product.productName}</h2>
                                <p className="text-gray-400 text-sm mt-1">Variants: {product.availableColors.length}</p>

                                <div className="mt-2">
                                    <span className="text-indigo-600 text-lg font-bold mr-2">
                                        ₹{product.availableColors[0].price}
                                    </span>
                                    <span className="text-gray-500 line-through">
                                        ₹{(product.availableColors[0].price * 1.15).toFixed()}
                                    </span>
                                    <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs ml-2">
                                        15% OFF
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-2">
                                        {product.availableColors.map((color, index) => (
                                            <span
                                                key={index}
                                                className="w-5 h-5 rounded-full border border-white"
                                                style={{ backgroundColor: color.colorId }}
                                            />
                                        ))}
                                    </div>

                                    <Link
                                        to={`/products/${product.productId}`}
                                        className="bg-indigo-600 hover:bg-indigo-500 hover:text-white text-white text-sm px-4 py-2 rounded-lg transition duration-200"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12 space-x-3">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md disabled:opacity-40"
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-4 py-2 rounded-md border transition duration-200 ${currentPage === page
                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                    : 'bg-[#121212] border-gray-600 text-gray-300 hover:border-indigo-600 hover:text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
