
// src/components/RecentComplaints.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecentComplaints = () => {
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/issues?limit=6");
                setIssues(res.data);
            } catch (err) {
                console.error("Error fetching issues:", err);
            }
        };
        fetchIssues();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight">
                Recent Complaints
            </h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">

                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-[#001931] p-4 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold text-white mb-2">{issue.title}</h2>
                        <p className="text-gray-300 mb-1">{issue.description?.slice(0, 80)}...</p>
                        <p className="text-gray-400 text-sm mb-1">
                            Category: <span className="text-purple-500">{issue.category}</span>
                        </p>
                        <p className="text-gray-400 text-sm mb-2">
                            Location: <span className="text-purple-500">{issue.location}</span>
                        </p>
                        <button
                            onClick={() => navigate(`/issue/${issue._id}`)}
                            className=" text-white text-lg py-3 px-6 rounded-xl font-extrabold
      bg-gradient-to-r from-[#574bc7] to-[#8eb4fa]
      shadow-[0_0_15px_rgba(138,43,226,0.6)]
      transition duration-300 ease-in-out
      hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]
      whitespace-nowrap"
                        >
                            See Details
                        </button>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default RecentComplaints;
