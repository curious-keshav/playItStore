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
        toast.success("You have successfully order.")
    }


    const removeItem = async (cartId) => {
        console.log("Trying to delete cartId:", cartId);
        await deleteCartItem(cartId).then(() => {
            setCartItems(cartItems.filter(item => item.cartId !== cartId));
        });
    };


    const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.productData?.availableColors[0]?.modelVariants[0]?.price || 0), 0).toFixed(2);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-between space-x-6">
            <div className="w-2/3 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-white">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.cartId} className="flex items-center mb-4 p-4 rounded-lg shadow-md bg-gradient-to-br from-[#1a1a1a] to-[#2e2e2e] hover:scale-105 transform transition-all duration-300 border-2 border-transparent hover:border-teal-400">
                            <img src={item.productData.productImg} alt={item.productData.productName} className="w-32 h-28 mr-4" />
                            <div className="flex-grow">
                                <span className='flex gap-2'>
                                    <h3 className="font-semibold text-white">{item.productData.productName}</h3>
                                    {/* You can show productId or any other info here if needed */}
                                </span>
                                <p className="mt-2 text-sm text-gray-300">Color: {item.productData?.availableColors[0]?.colorName}</p>
                                <p className="text-sm text-gray-300">Variant: {item.productData?.availableColors[0]?.modelVariants[0]?.modelName}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="font-semibold text-lg text-teal-400">
                                    ${item.productData?.availableColors[0]?.modelVariants[0]?.price}
                                </p>
                                <button
                                    onClick={() => removeItem(item?.cartId)}
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
                <button onClick={checkoutHandler} className="w-full bg-teal-400 text-white py-2 rounded-lg hover:bg-teal-500 transition duration-200">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItems;
