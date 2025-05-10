import { useState } from "react";

const ProductFilters = ({ onFilterChange }) => {
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [selectedCategory, setSelectedCategory] = useState("");


    const handleCategorySelection = (category) => {
        const newCategory = selectedCategory === category ? "" : category;
        setSelectedCategory(newCategory);
        onFilterChange({ sortOrder, categories: newCategory });
    };

    const categories = ['Gaming Consoles', 'Accessories', 'Monitors'];

    const handleSortChange = (order) => {
        setSortOrder(order);
        onFilterChange({ sortOrder: order, categories: selectedCategory });
    };


    return (
        <div className="col-span-1 bg-[#1a1a1a] p-6 rounded-2xl shadow-lg h-fit">
            <h2 className="text-white text-2xl font-semibold mb-6">Filters</h2>
            <div className="space-y-6">

                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Sort By Price</h3>
                    <div className="space-x-2 flex  justify-start ">
                        <button
                            onClick={() => handleSortChange('lowToHigh')}
                            className={`px-3 py-2 text-xs rounded-md transition duration-200 ease-in-out ${sortOrder === 'lowToHigh' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'} hover:bg-indigo-500 hover:shadow-md focus:outline-none`}
                        >
                            Low to High
                        </button>
                        <button
                            onClick={() => handleSortChange('highToLow')}
                            className={`px-3 py-2 text-xs rounded-md transition duration-200 ease-in-out ${sortOrder === 'highToLow' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'} hover:bg-indigo-500 hover:shadow-md focus:outline-none`}
                        >
                            High to Low
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2 justify-start sm:justify-between">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelection(category)}
                                className={`text-xs sm:text-sm rounded-md transition duration-200 ease-in-out ${selectedCategory === category ? 'bg-teal-400 text-white' : 'bg-gray-700 text-white'
                                    } hover:bg-indigo-600 hover:shadow-md focus:outline-none`}
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
