
import React, { useEffect, useState } from "react";
import BannerSlider from "../Components/BannerSlider";
import CategoryCard from "../Components/CategoryCard";
import RecentComplaints from "../Components/RecentComplaints";
import StatsSection from "../Components/StateSection";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import Welcome from "../assets/welCome.json";



const Home = () => {
    const [recentIssues, setRecentIssues] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 1507,
        resolved: 750,
        pending: 320,
    });

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get("https://community-clean-server-rep.vercel.app/api/issues?limit=6&sort=-date");
                setRecentIssues(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching issues:", err);
                setRecentIssues([]);
                Swal.fire("Error", "Failed to load recent issues", "error");
            }
        };

        const fetchStats = async () => {
            try {
                const res = await axios.get("https://community-clean-server-rep.vercel.app/api/stats");
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
            <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
                <h1 className="text-3xl font-bold mb-6 text-sky-600">Welcome to Our Portal</h1>
                <Lottie animationData={Welcome} loop={true} className="w-80 h-80" />
            </div>
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
