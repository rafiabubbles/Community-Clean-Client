import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const DetailButton = ({ text, onClick }) => (
    <motion.button
        onClick={onClick}
        className="
      flex items-center justify-center space-x-2
      py-3 px-6 rounded-xl font-extrabold text-white text-lg
      bg-gradient-to-r from-[#574bc7] to-[#8eb4fa]
      border border-[#a020f0]
      shadow-[0_0_15px_rgba(138,43,226,0.6)]
      transition duration-300 ease-in-out
      hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]
      whitespace-nowrap
    "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <span>{text}</span>
        <HiArrowRight className="text-xl" />
    </motion.button>
);

const BannerSlider = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    // ✅ Fetch banner data from MongoDB via backend
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/banners");
                setImages(res.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };
        fetchBanners();
    }, []);

    const totalSlides = images.length;

    useEffect(() => setImageError(false), [currentIndex]);

    // Auto slide every 6 seconds
    useEffect(() => {
        if (totalSlides < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 6000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const nextSlide = () => setCurrentIndex((currentIndex + 1) % totalSlides);
    const prevSlide = () => setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);

    const bannerVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.8, ease: "easeInOut" },
    };

    if (images.length === 0) {
        return (
            <div className="flex justify-center items-center h-80 text-gray-400 text-xl">
                Loading banners...
            </div>
        );
    }

    const currentImage = images[currentIndex];
    const placeholderUrl = `https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(
        currentImage.title?.toUpperCase() || "BANNER"
    )}+IMAGE`;

    const imageSrc =
        !currentImage.coverPhoto || imageError ? placeholderUrl : currentImage.coverPhoto;

    return (
        <div className="pt-20 pb-10 px-4 sm:px-6 md:px-10 flex justify-center">
            <div className="w-full max-w-6xl relative overflow-hidden rounded-2xl shadow-2xl h-[400px] sm:h-[450px] md:h-[500px] bg-gray-900">

                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentImage._id || currentImage.id}
                        className="absolute inset-0 w-full h-full p-4 sm:p-8"
                        variants={bannerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="w-full h-full grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start p-6 md:p-12 text-center md:text-left z-10">
                                <motion.h2
                                    className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    {currentImage.title}
                                </motion.h2>

                                <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-6 drop-shadow-md">
                                    {currentImage.description}
                                </p>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex justify-center md:justify-start"
                                >
                                    <DetailButton
                                        text="View Details"
                                        onClick={() =>
                                            currentImage.downloadLink &&
                                            window.open(currentImage.downloadLink, "_blank")
                                        }
                                        className="bg-sky-500 hover:bg-sky-600"
                                    />
                                </motion.div>
                            </div>



                            {/* Image */}
                            <motion.img
                                src={imageSrc}
                                alt={`${currentImage.title} Banner`}
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl transition duration-500"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white transition z-10"
                        >
                            <HiArrowLeft className="text-3xl" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white transition z-10"
                        >
                            <HiArrowRight className="text-3xl" />
                        </button>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                            {images.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "w-6 bg-gradient-to-r from-[#7598f8] to-[#8bc0fd] shadow-md shadow-[#8a2be2]/80"
                                        : "bg-white/50 hover:bg-white/80"
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BannerSlider;
