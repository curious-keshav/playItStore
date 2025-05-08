import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarProducts = ({ products }) => {
    const navigate = useNavigate();

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Products</h2>
            <div className="flex overflow-x-auto gap-6 pb-4">
                {products.map((prod) => (
                    <div
                        key={prod?.productId}
                        onClick={() => navigate(`/products/${prod?.productId}`)}
                        className="cursor-pointer flex-none w-[200px] bg-[#1e1e1e] p-4 rounded-xl border border-[#333] text-center hover:border-teal-400 transition"
                    >
                        <img
                            src={prod.productImg}
                            alt={prod.productName}
                            className="w-full h-[150px] object-contain bg-white rounded-2xl mb-4"
                        />
                        <h3 className="text-md font-semibold text-white">{prod.productName}</h3>
                        <div className="mt-2">
                            <span className="text-sm font-bold text-white mr-2">
                                ₹{prod.availableColors[0].price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;
