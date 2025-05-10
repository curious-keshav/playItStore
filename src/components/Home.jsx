import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className=" text-white py-20 px-4">
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center  md:px-8">
                <div className="absolute inset-0 opacity-90 z-0" />
                <div className="absolute -top-10 -left-10 w-96 h-96 bg-indigo-600 opacity-20 blur-[120px] rounded-full z-0" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 opacity-20 blur-[100px] rounded-full z-0" />

                <div className="relative z-10 space-y-6">
                    <h1 className="text-3xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
                        Enter the <span className="text-indigo-600">Next Level</span> of Gaming
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Discover the ultimate collection of gaming consoles, accessories, and gear. Whether you're a console warrior or a PC pro, we've got what you need.
                    </p>
                    <Link to={"/products"} className=''>
                        <button className="bg-indigo-600 mt-5 hover:bg-indigo-500 text-black text-lg px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                            Shop Now <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>

                <div className="relative z-10 ">
                    <div className="rounded-2xl overflow-hidden border-2 border-indigo-600 shadow-xl hover:shadow-indigo-400/30 transition-all duration-500">
                        <img
                            src="./homeLanding.svg"
                            alt="Gaming Setup"
                            className="w-full h-[400px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-24 xl:px-32">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
                    <div className="bg-[#1f1f1f] p-8 rounded-2xl border border-gray-700 hover:border-indigo-600 hover:shadow-indigo-500/20 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3">Premium Gear</h3>
                        <p className="text-gray-400">Curated high-performance consoles, headsets, and accessories for peak gaming.</p>
                    </div>
                    <div className="bg-[#1f1f1f] p-8 rounded-2xl border border-gray-700 hover:border-indigo-600 hover:shadow-indigo-500/20 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3">Trusted Brands</h3>
                        <p className="text-gray-400">We only sell from globally renowned gaming brands like Sony, Xbox, Nintendo, and more.</p>
                    </div>
                    <div className="bg-[#1f1f1f] p-8 rounded-2xl border border-gray-700 hover:border-indigo-600 hover:shadow-indigo-500/20 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
                        <p className="text-gray-400">Get your gear quickly and securely with our reliable shipping options.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
