import React, { useEffect, useState } from 'react';
import { deleteCartItem, fetchCartWithDetails } from './Firebase/cart';
import { toast } from 'react-toastify';

const CartItems = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllCart = async () => {
            try {
                const response = await fetchCartWithDetails();
                setCartItems(response);
            } catch (err) {
                setError("Failed to load cart items", err);
            } finally {
                setLoading(false);
            }
        };

        getAllCart();
    }, []);

    const checkoutHandler = () => {
        toast.success("You have successfully placed the order.");
    };

    const removeItem = async (cartId) => {
        console.log("Trying to delete cartId:", cartId);
        await deleteCartItem(cartId).then(() => {
            setCartItems(cartItems.filter(item => item.cartId !== cartId));
        });
    };

    const subtotal = cartItems
        .reduce((acc, item) => acc + parseFloat(item.productData?.availableColors[0]?.modelVariants[0]?.price || 0), 0)
        .toFixed(2);

    if (loading) return <div className="text-white text-center py-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-6 p-4">
            {/* Cart List */}
            <div className="lg:w-2/3 p-6 bg-gradient-to-br from-[#181818] to-[#242424] rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-indigo-400">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-white">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.cartId}
                            className="flex items-center mb-4 p-4 rounded-lg shadow-md bg-[#1f1f1f] hover:scale-[1.02] transform transition-all duration-300 border border-[#2c2c2c] hover:border-indigo-400"
                        >
                            <img
                                src={item.productData.productImg}
                                alt={item.productData.productName}
                                className="w-28 h-24 object-cover rounded-lg mr-4"
                            />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-white">{item.productData.productName}</h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Color: {item.productData?.availableColors[0]?.colorName}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Variant: {item.productData?.availableColors[0]?.modelVariants[0]?.modelName}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-bold text-indigo-400 text-lg">
                                    ₹{item.productData?.availableColors[0]?.modelVariants[0]?.price}
                                </p>
                                <button
                                    onClick={() => removeItem(item?.cartId)}
                                    className="text-sm text-red-500 hover:text-red-400 transition duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 bg-[#1a1a1a] h-fit p-6 rounded-xl shadow-lg border border-[#2c2c2c]">
                <h2 className="text-2xl font-semibold mb-6 text-indigo-400">Order Summary</h2>
                <div className="mb-4">
                    <p className="text-lg font-medium text-white">
                        Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}): <span className="text-indigo-400">₹
                            {subtotal}</span>
                    </p>
                </div>
                <p className="mb-6 text-sm text-gray-400">This order contains a gift.</p>
                <button
                    onClick={checkoutHandler}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition duration-200 font-semibold"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItems;
