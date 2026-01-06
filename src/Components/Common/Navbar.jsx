import React from "react";

const Navbar = () => {
    return (
        <nav className="w-full border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">E-Commerce</h1>
            <div className="flex gap-4">
                <a href="/" className="text-gray-700 hover:text-blue-600">
                    Home
                </a>
                <a href="/products" className="text-gray-700 hover:text-blue-600">
                    Products
                </a>
                <a href="/cart" className="text-gray-700 hover:text-blue-600">
                    Cart
                </a>
                <a href="/users" className="text-gray-700 hover:text-blue-600">
                    Users
                </a>
                <a href="/orders" className="text-gray-700 hover:text-blue-600">
                    Orders
                </a>
                <a href="/wishlist" className="text-gray-700 hover:text-blue-600">
                    Wishlist
                </a>
                <a href="/contect" className="text-gray-700 hover:text-blue-600">
                    Contect
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
