import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Header = () => {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleProfile = () => setProfileOpen(!profileOpen);

    const closeAll = () => {
        setMenuOpen(false);
        setProfileOpen(false);
    };

    return (
        <nav className="bg-[#001931] text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center" onClick={closeAll}>
                        <img src={logo} alt="Clean Community" className="h-10 w-10" />
                        <span className="text-sky-400 text-xl font-semibold ml-2">
                            Cleaning & Service
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {!user ? (
                            <>
                                <NavLink to="/" className="hover:text-cyan-400">Home</NavLink>
                                <NavLink to="/issues" className="hover:text-cyan-400">Issues</NavLink>
                                <NavLink
                                    to="/login"
                                    className="hover:text-cyan-400 border border-sky-400 px-3 py-1 rounded transition"
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className="hover:text-cyan-400 border border-sky-400 px-3 py-1 rounded transition"
                                >
                                    Register
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" className="hover:text-cyan-400">Home</NavLink>
                                <NavLink to="/all-issues" className="hover:text-cyan-400">All Issues</NavLink>
                                <NavLink to="/add-issue" className="hover:text-cyan-400">Add Issue</NavLink>
                                <NavLink to="/my-issues" className="hover:text-cyan-400">My Issues</NavLink>
                                <NavLink to="/my-contributions" className="hover:text-cyan-400">My Contribution</NavLink>

                                {/* Profile dropdown */}
                                <div className="relative">
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/40"}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full cursor-pointer border-2 border-cyan-400"
                                        onClick={toggleProfile}
                                    />
                                    {profileOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-blue-950 border border-gray-700 rounded-lg shadow-lg py-2">
                                            <p className="px-4 text-sm text-gray-300 truncate">
                                                {user.displayName || "User"}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    closeAll();
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-pink-200 hover:text-black transition-colors"
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
                            onClick={toggleMenu}
                            className="text-2xl text-white focus:outline-none"
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#00284f] border-t border-gray-700 px-4 pb-4 space-y-2">
                    {!user ? (
                        <>
                            <Link to="/" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Home</Link>
                            <Link to="/issues" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Issues</Link>
                            <Link to="/login" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Login</Link>
                            <Link to="/register" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Home</Link>
                            <Link to="/all-issues" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">All Issues</Link>
                            <Link to="/add-issue" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Add Issue</Link>
                            <Link to="/my-issues" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">My Issues</Link>
                            <Link to="/my-contributions" onClick={closeAll} className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">My Contribution</Link>
                            <button
                                onClick={() => {
                                    logout();
                                    closeAll();
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;