import React, { useState } from 'react';
import AdminOrdersTable from './AdminOrderTable';
import AdminProductListingTable from './AdminProductListingTable';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className='min-h-screen  text-gray-800'>
            <nav className='bg-gray-800 text-white px-8 py-4 sticky top-0 z-50 shadow-md'>
                <div className='flex justify-between items-center max-w-7xl mx-auto'>
                    <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
                    <div className='space-x-6'>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`hover:underline ${activeTab === 'products' ? 'underline text-yellow-300' : ''}`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`hover:underline ${activeTab === 'orders' ? 'underline text-yellow-300' : ''}`}
                        >
                            Orders
                        </button>
                    </div>
                </div>
            </nav>

            <div className='max-w-7xl mx-auto px-4 py-10'>
                {activeTab === 'products' ? (
                    <>
                        <h4 className='text-center text-white text-4xl font-bold mb-10'>Available Products</h4>
                        <AdminProductListingTable />
                    </>
                ) : (
                    <>
                        <h4 className='text-center text-4xl text-white font-bold mb-10'>User Orders</h4>
                        <AdminOrdersTable />
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
