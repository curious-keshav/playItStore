import React, { useState } from 'react';
import { DUMMY_DATA } from '../api/DummyData';

const CartItems = () => {
    const [cartItems, setCartItems] = useState(DUMMY_DATA);

    const removeItem = (productId) => {
        setCartItems(cartItems.filter(item => item.productId !== productId));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.availableColors[0].modelVariants[0].price), 0).toFixed(2);

    return (
        <div className="flex justify-between space-x-6 ">
            <div className="w-2/3  p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-white">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.productId} className="flex items-center mb-4 p-4 rounded-lg shadow-md bg-gradient-to-br from-[#1a1a1a] to-[#2e2e2e] hover:scale-105 transform transition-all duration-300 border-2 border-transparent hover:border-teal-400">
                            <img src={item.productImg} alt={item.productName} className="w-32 h-28  mr-4 " />
                            <div className="flex-grow">
                                <span className='flex gap-2'>
                                    <h3 className="font-semibold text-white">{item.productName}</h3>
                                    <h4 className='text-xs bg-[#818181] w-fit p-1 rounded-md'>{item.productId}</h4>
                                </span>
                                <h3 className="font-semibold text-[#818181]/80 text-sm">{item.category}</h3>

                                <p className="mt-2 text-sm text-gray-300">Color:  {item.availableColors[0].colorName}</p>
                                <p className="text-sm text-gray-300">Variant: {item.availableColors[0].modelVariants[0].modelName}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="font-semibold text-lg text-teal-400">${item.availableColors[0].modelVariants[0].price}</p>
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="text-sm text-red-500 hover:text-red-600 transition duration-200"
                                >
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="w-1/3 bg-[#1a1a1a] h-fit p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
                <div className="mb-4">
                    <p className="text-lg font-semibold text-white">Subtotal ({cartItems.length} items): ${subtotal}</p>
                </div>
                <div className="mb-4 text-sm text-gray-500">
                    <p>This order contains a gift</p>
                </div>
                <button className="w-full bg-teal-400 text-white py-2 rounded-lg hover:bg-teal-500 transition duration-200">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItems;
