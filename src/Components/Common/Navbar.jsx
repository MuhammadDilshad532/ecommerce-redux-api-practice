import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold">E-Commerce</h1>

      <div className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600">
          Products
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">
          Cart
        </Link>
        <Link to="/users" className="text-gray-700 hover:text-blue-600">
          Users
        </Link>
        <Link to="/orders" className="text-gray-700 hover:text-blue-600">
          Orders
        </Link>
        <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">
          Wishlist
        </Link>
        <Link to="/contect" className="text-gray-700 hover:text-blue-600">
          Contect
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
