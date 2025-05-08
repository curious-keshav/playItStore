import { useState } from "react";

const ProductFilters = ({ onFilterChange }) => {
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = ['Gaming Consoles', 'Accessories', 'Monitors'];

    const handleSortChange = (order) => {
        setSortOrder(order);
        onFilterChange({ sortOrder: order, priceRange, categories: selectedCategories });
    };

    const handlePriceRangeChange = (e) => {
        const value = e.target.value.split(',').map(Number);
        setPriceRange(value);
        onFilterChange({ sortOrder, priceRange: value, categories: selectedCategories });
    };

    const handleCategorySelection = (category) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newCategories);
        onFilterChange({ sortOrder, priceRange, categories: newCategories });
    };

    return (
        <div className="col-span-1 bg-[#1a1a1a] p-6 rounded-2xl shadow-lg h-fit">
            <h2 className="text-white text-2xl font-semibold mb-6">Filters</h2>
            <div className="space-y-6">

                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Sort By Price</h3>
                    <div className="space-x-2 flex flex-wrap justify-start sm:justify-between">
                        <button
                            onClick={() => handleSortChange('lowToHigh')}
                            className={`px-4 py-2 text-sm rounded-md transition duration-200 ease-in-out ${sortOrder === 'lowToHigh' ? 'bg-teal-400 text-white' : 'bg-gray-700 text-white'} hover:bg-teal-500 hover:shadow-md focus:outline-none`}
                        >
                            Low to High
                        </button>
                        <button
                            onClick={() => handleSortChange('highToLow')}
                            className={`px-4 py-2 text-sm rounded-md transition duration-200 ease-in-out ${sortOrder === 'highToLow' ? 'bg-teal-400 text-white' : 'bg-gray-700 text-white'} hover:bg-teal-500 hover:shadow-md focus:outline-none`}
                        >
                            High to Low
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Price Range</h3>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange.join(',')}
                        onChange={handlePriceRangeChange}
                        step="100"
                        className="w-full h-2 bg-gray-500 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2 justify-start sm:justify-between">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelection(category)}
                                className={`text-xs sm:text-sm rounded-md transition duration-200 ease-in-out ${selectedCategories.includes(category) ? 'bg-teal-400 text-white' : 'bg-gray-700 text-white'} hover:bg-teal-500 hover:shadow-md focus:outline-none`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductFilters;
