import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#0f0f0f] text-gray-400 py-6 px-4 mt-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} PlayItStore. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition">Terms of Service</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
