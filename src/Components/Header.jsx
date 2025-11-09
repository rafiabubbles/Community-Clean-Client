import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ import the hook
import logo from "../assets/logo.png";

const Header = () => {
    const { user, logout } = useAuth(); // get user & logout
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-[#001931] text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Clean Community" className="h-12" />
                        <span className="text-sky-400 text-xl font-semibold ml-2">
                            Cleaning & Service
                        </span>
                    </Link>

                    {/* Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {!user ? (
                            <>
                                <Link to="/" className="hover:text-cyan-600">Home</Link>
                                <Link to="/issues" className="hover:text-cyan-600">Issues</Link>
                                <Link to="/login" className="hover:text-cyan-600">Login</Link>
                                <Link to="/register" className="hover:text-cyan-600">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:text-cyan-600">Home</Link>
                                <Link to="/all-issues" className="hover:text-cyan-600">All Issues</Link>
                                <Link to="/add-issue" className="hover:text-cyan-600">Add Issue</Link>
                                <Link to="/my-issues" className="hover:text-cyan-600">My Issues</Link>
                                <Link to="/my-contributions" className="hover:text-cyan-600">My Contribution</Link>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/40"}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full cursor-pointer"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    />
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-blue-950 text-white border rounded-lg shadow-lg py-2">
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 hover:bg-pink-200"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            ☰
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {dropdownOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
                    {!user ? (
                        <>
                            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100">Home</Link>
                            <Link to="/issues" className="block px-3 py-2 rounded-md hover:bg-gray-100">Issues</Link>
                            <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-gray-100">Login</Link>
                            <Link to="/register" className="block px-3 py-2 rounded-md hover:bg-gray-100">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100">Home</Link>
                            <Link to="/issues" className="block px-3 py-2 rounded-md hover:bg-gray-100">All Issues</Link>
                            <Link to="/add-issue" className="block px-3 py-2 rounded-md hover:bg-gray-100">Add Issue</Link>
                            <Link to="/my-issues" className="block px-3 py-2 rounded-md hover:bg-gray-100">My Issues</Link>
                            <Link to="/my-contributions" className="block px-3 py-2 rounded-md hover:bg-gray-100">My Contribution</Link>
                            <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100">Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Heade;
