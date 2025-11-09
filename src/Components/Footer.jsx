// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#001931] text-white">
            {/* Top Section */}
            <div className="container mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 text-center sm:text-left">
                {/* Logo + Description */}
                <div className="flex flex-col items-center sm:items-start">
                    <Link to="/" className="flex items-center justify-center sm:justify-start">
                        <img src={logo} alt="Clean Community" className="h-12 w-auto" />
                        <span className="text-sky-400 text-lg sm:text-xl font-semibold ml-2">
                            Cleaning & Service
                        </span>
                    </Link>
                    <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xs sm:max-w-sm">
                        A community-driven platform to report and resolve local cleanliness
                        issues. Join hands to make your surroundings clean and green 🌿
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h6 className="text-lg font-semibold mb-4 text-cyan-400">
                        Useful Links
                    </h6>
                    <ul className="space-y-2 text-gray-300">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-cyan-400 transition-colors duration-200"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/issues"
                                className="hover:text-cyan-400 transition-colors duration-200"
                            >
                                All Issues
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-cyan-400 transition-colors duration-200"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h6 className="text-lg font-semibold mb-4 text-cyan-400">
                        Follow Us
                    </h6>
                    <div className="flex justify-center sm:justify-start gap-5">
                        {/* Facebook */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>

                        {/* X (Twitter) */}
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="fill-current"
                            >
                                <path d="M18.244 2H21.6l-7.6 8.7L22 22h-6.967l-5.455-6.7L3.6 22H.244l8.108-9.274L2 2h7.033l4.977 6.095L18.244 2zm-2.422 18h1.855L7.4 4h-1.9l10.322 16z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-500 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-[#001622] text-center py-4 border-t border-gray-800">
                <p className="text-xs sm:text-sm text-gray-400 px-3">
                    © {new Date().getFullYear()} CleanCommunity — All rights reserved | Designed by{" "}
                    <span className="text-cyan-400 font-semibold">Rafia</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
