import React from 'react';
import { DUMMY_DATA } from '../../api/DummyData';

const AdminProductListingTable = () => {
    return (
        <div className="w-full overflow-x-auto p-4">
            <table className="min-w-full text-center border border-gray-700 bg-gray-900 text-gray-200 shadow">
                <thead className="bg-gray-800 text-gray-100">
                    <tr className="text-base">
                        <th className="border border-gray-700 px-4 py-3">ID</th>
                        <th className="border border-gray-700 px-4 py-3">Name</th>
                        <th className="border border-gray-700 px-4 py-3">Created At</th>
                        <th className="border border-gray-700 px-4 py-3">Category</th>
                        <th className="border border-gray-700 px-4 py-3">Image</th>
                        <th className="border border-gray-700 px-4 py-3">Colors</th>
                        <th className="border border-gray-700 px-4 py-3">Model Variants</th>
                        <th className="border border-gray-700 px-4 py-3">Storage Options</th>
                        <th className="border border-gray-700 px-4 py-3">Base Price</th>
                    </tr>
                </thead>
                <tbody>
                    {DUMMY_DATA.map((data, index) => {
                        const color = data.availableColors[0];
                        const models = color?.modelVariants || [];
                        const storageOptions = models.flatMap(m => m.storageOptions || []);

                        return (
                            <tr key={index} className="text-sm hover:bg-gray-800 transition-colors">
                                <td className="border border-gray-700 px-4 py-2">{data.productId}</td>
                                <td className="border border-gray-700 px-4 py-2">{data.productName}</td>
                                <td className="border border-gray-700 px-4 py-2">{new Date(data.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-700 px-4 py-2">{data.category}</td>
                                <td className="border border-gray-700 px-4 py-2">
                                    <img
                                        src={data.productImg}
                                        alt={data.productName}
                                        className="h-12 w-12 rounded object-cover mx-auto border border-gray-600"
                                    />
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {data.availableColors.map((color, idx) => (
                                        <div key={idx} className="mb-1 flex items-center gap-2">
                                            <span
                                                className="w-4 h-4 rounded-full border border-gray-400"
                                                style={{ backgroundColor: color.colorId }}
                                            />
                                            <span className="text-gray-300">{color.colorName}</span>
                                        </div>
                                    ))}
                                </td>
                                <td className="border border-gray-700 px-4 py-2 text-left">
                                    {models.map((model, idx) => (
                                        <div key={idx}>
                                            <span className="text-gray-300">
                                                {model.modelName} – ₹{model.price}
                                            </span>
                                        </div>
                                    ))}
                                </td>
                                <td className="border border-gray-700 px-4 py-2 text-left">
                                    {storageOptions.map((storage, idx) => (
                                        <div key={idx}>
                                            <span className="text-gray-300">
                                                {storage.storageName} – ₹{storage.price}
                                            </span>
                                        </div>
                                    ))}
                                </td>
                                <td className="border border-gray-700 px-4 py-2 font-medium">₹{color.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductListingTable;
