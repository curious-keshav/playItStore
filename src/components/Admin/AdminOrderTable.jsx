import React, { useState } from 'react';

const sampleOrders = [
    {
        orderId: 'ORD123',
        userName: 'John Doe',
        product: 'PlayStation 5',
        date: '2025-05-07',
        status: 'Processing',
    },
    {
        orderId: 'ORD124',
        userName: 'Jane Smith',
        product: 'Xbox Series X',
        date: '2025-05-06',
        status: 'Shipped',
    },
];

const AdminOrdersTable = () => {
    const [orders, setOrders] = useState(sampleOrders);

    const handleStatusChange = (index, newStatus) => {
        const updated = [...orders];
        updated[index].status = newStatus;
        setOrders(updated);
    };

    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full text-center border border-gray-700 bg-gray-900 text-gray-200 shadow'>
                <thead className='bg-gray-800 text-gray-100'>
                    <tr>
                        <th className='border border-gray-700 px-4 py-2'>Order ID</th>
                        <th className='border border-gray-700 px-4 py-2'>User Email</th>
                        <th className='border border-gray-700 px-4 py-2'>Product</th>
                        <th className='border border-gray-700 px-4 py-2'>Date</th>
                        <th className='border border-gray-700 px-4 py-2'>Status</th>
                        <th className='border border-gray-700 px-4 py-2'>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className='text-sm hover:bg-gray-800'>
                            <td className='border border-gray-700 px-4 py-2'>{order.orderId}</td>
                            <td className='border border-gray-700 px-4 py-2'>{order.userName}</td>
                            <td className='border border-gray-700 px-4 py-2'>{order.product}</td>
                            <td className='border border-gray-700 px-4 py-2'>{order.date}</td>
                            <td className='border border-gray-700 px-4 py-2'>{order.status}</td>
                            <td className='border border-gray-700 px-4 py-2'>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                    className='bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrdersTable;
