import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryCard = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories");
                // Ensure we only take the first 4 cards for display
                setCards(res.data.slice(0, 4));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories. Please try again later.");
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // --- Conditional Rendering for Loading/Error States ---
    if (loading) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-gray-700 dark:text-gray-300">Loading categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    if (cards.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-gray-700 dark:text-gray-300">No categories found.</p>
            </div>
        );
    }

    // --- Main Component Rendering ---
    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight">
                Explore Categories
            </h2>

            {/* 4 cards in a row for medium/large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card) => (
                    <div
                        key={card._id}
                        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out border border-gray-100 dark:border-gray-700 group"
                    >
                        {/* Image Section - Enforced Aspect Ratio for Consistency */}
                        <div className="relative w-full aspect-square overflow-hidden">
                            <img
                                src={card.coverPhoto}
                                alt={card.title}
                                // Use object-cover to maintain aspect ratio, rounded-t-xl for top corners
                                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:opacity-80"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                {card.title}
                            </h3>
                            <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                                {card.description}
                            </p>
                        </div>
                        {/* Optional: Add a subtle CTA */}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;