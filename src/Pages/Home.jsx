// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import BannerSlider from "../Components/BannerSlider";
import CategoryCard from "../Components/CategoryCard";
import RecentComplaints from "../Components/RecentComplaints";
import StatsSection from "../Components/StateSection";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";

const Home = () => {
    const [recentIssues, setRecentIssues] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 1507, // default number
        resolved: 750,    // default number
        pending: 320,     // default number
    });

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/issues?limit=6&sort=-date");
                setRecentIssues(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching issues:", err);
                setRecentIssues([]);
                Swal.fire("Error", "Failed to load recent issues", "error");
            }
        };

        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/stats");
                if (res.data) setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
                Swal.fire("Error", "Failed to load community stats", "error");
            }
        };

        fetchIssues();
        fetchStats();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Banner Section */}
            <BannerSlider />

            {/* Category Section */}
            <section className="py-16 bg-sky-50">
                <CategoryCard />
            </section>

            {/* Recent Complaints */}
            <section className="py-16 bg-white">
                <RecentComplaints />
            </section>

            {/* Community Stats Section */}
            <section className="py-16 bg-sky-100">
                <StatsSection stats={stats} />
            </section>

            {/* Volunteer Call-to-Action */}
            <section className="bg-gradient-to-r from-cyan-500 to-blue-500 py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-10 text-center text-white">
                    <h2 className="text-4xl font-extrabold mb-4">Join Our Clean Drive!</h2>
                    <p className="mb-6 text-lg">
                        Be a part of the community effort to keep our surroundings clean and sustainable.
                    </p>
                    <Link
                        to="/volunteer"
                        className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition"
                    >
                        Become a Volunteer
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
