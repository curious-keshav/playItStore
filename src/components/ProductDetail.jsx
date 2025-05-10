/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DUMMY_DATA } from '../api/DummyData';
import Breadcrumb from './Breadcrumb';
import SimilarProducts from './SimilarProducts';
import { toast } from 'react-toastify';
import { addToCart } from './Firebase/cart';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = DUMMY_DATA.find(p => p.productId === id);

    const [selectedColor, setSelectedColor] = useState({
        index: 0,
        id: product?.availableColors?.[0]?.colorId || -1,
    });

    const [selectedModel, setSelectedModel] = useState({
        index: 0,
        id: product?.availableColors?.[0]?.modelVariants?.[0]?.modelId || -1,
    });

    const [showFullDescription, setShowFullDescription] = useState(false);
    const maxLength = 250;

    const toggleDescription = () => {
        setShowFullDescription(prev => !prev);
    };

    const shouldTruncate = product?.description?.length > maxLength;
    const displayText = showFullDescription
        ? product?.description
        : product?.description?.slice(0, maxLength) + (shouldTruncate ? "..." : "");

    const selectedColorData = product?.availableColors?.[selectedColor.index];
    const selectedModelData = selectedColorData?.modelVariants?.[selectedModel.index];

    const addToCartHandler = async () => {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) {
            toast.error("Please log in to add items to your cart.");
            return;
        }

        try {
            await addToCart({
                userEmail,
                productId: id,
                colorId: selectedColor.id,
                modelId: selectedModel.id,
            });
            toast.success("Product added to cart!");
        } catch (error) {
            toast.error("Failed to add to cart.");
            console.error(error);
        }
    };

    const buyHandler = () => {
        toast.success(`${selectedModelData?.modelName || 'Model'} - ${selectedColorData?.colorName || 'Color'} successfully ordered.`);
    };

    if (!product) {
        return (
            <div className="text-center text-white py-10">
                <p>Product not found</p>
                <button onClick={() => navigate(-1)} className="mt-4 px-6 py-3 bg-[#ff4141] text-white rounded-lg shadow-md hover:bg-[#e63946] transition-all">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white py-10 px-6 flex flex-col gap-8">
            <Breadcrumb product={product} />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex justify-center flex-col">
                    <img
                        src={product?.productImg}
                        alt={product?.productName}
                        className="w-full h-[400px] object-contain bg-white rounded-2xl shadow-lg p-4"
                    />

                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={addToCartHandler} className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200">
                            Add to Cart
                        </button>
                        <button onClick={buyHandler} className="w-full sm:w-auto bg-[#ff4141] hover:bg-[#e63946] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200">
                            Buy Now
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{product?.productName}</h1>
                    <p className="text-sm text-gray-400 mb-4">Product ID: {product?.productId}</p>

                    <div className="mt-4">
                        <span className="text-2xl font-bold text-white mr-2">
                            ₹{selectedModelData?.price || selectedColorData?.price}
                        </span>
                        <span className="line-through text-gray-500 text-lg">
                            ₹{(selectedModelData?.price * 1.15 || selectedColorData?.price * 1.15).toFixed()}
                        </span>
                    </div>

                    <div className="mt-4">
                        <p className="font-semibold text-lg mb-2">Available Colors:</p>
                        <div className="flex gap-2">
                            {product?.availableColors?.map((color, index) => (
                                <span
                                    key={index}
                                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-200 ${selectedColor.index === index
                                        ? 'border-[#ff4141] scale-110'
                                        : 'border-white'
                                        }`}
                                    style={{ backgroundColor: color?.colorId }}
                                    onClick={() => {
                                        setSelectedColor({ index, id: color.colorId });
                                        setSelectedModel({ index: 0, id: color.modelVariants?.[0]?.modelId });
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-semibold text-lg mb-2">Model Variants:</p>
                        <div className="flex gap-4 overflow-x-auto">
                            {selectedColorData?.modelVariants?.map((model, index) => (
                                <button
                                    key={index}
                                    className={`px-6 py-2 bg-[#333] rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${selectedModel.index === index
                                        ? 'border-1 border-[#fff] text-white'
                                        : ' text-white'
                                        }`}
                                    onClick={() => setSelectedModel({ index, id: model.modelId })}
                                >
                                    {model?.modelName}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 bg-[#1e1e1e] p-4 rounded-xl border border-[#333]">
                        <h3 className="text-lg font-semibold text-white mb-2">Available Offers</h3>
                        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                            <li>
                                <span className="text-white font-medium">Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
                                <span className="text-blue-400 cursor-pointer ml-1">T&C</span>
                            </li>
                            <li>
                                <span className="text-white font-medium">Bank Offer</span> 10% instant discount on SBI Credit Card Transactions, up to ₹1,250 on orders of ₹4,990 and above
                                <span className="text-blue-400 cursor-pointer ml-1">T&C</span>
                            </li>
                            <li>
                                <span className="text-white font-medium">Special Price</span> Get extra 16% off (price inclusive of cashback/coupon)
                                <span className="text-blue-400 cursor-pointer ml-1">T&C</span>
                            </li>
                        </ul>
                    </div>

                    <p className="text-gray-300 mt-4 leading-relaxed">
                        <span>
                            {displayText}
                            {shouldTruncate && (
                                <span
                                    onClick={toggleDescription}
                                    className="ml-1 text-blue-400 underline hover:text-blue-300 cursor-pointer text-xs"
                                >
                                    {showFullDescription ? "Show less" : "Show more"}
                                </span>
                            )}
                        </span>
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 bg-white text-black px-6 py-2 rounded-xl hover:bg-gray-200 transition duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            <SimilarProducts products={DUMMY_DATA.filter(p => p.productId !== id)} />
        </div>
    );
};

export default ProductDetail;
