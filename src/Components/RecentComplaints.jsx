
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

const RecentComplaints = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get("https://community-clean-server-rep.vercel.app/api/add-issue");
                const recentSix = res.data.slice(0, 6);

                setIssues(recentSix);
            } catch (err) {
                console.error("Failed to load issues:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight">
                Recent Complaints
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-white shadow rounded-lg flex flex-col overflow-hidden"
                    >
                        <div className="w-full h-48 sm:h-56 md:h-48 lg:h-56 overflow-hidden">
                            <img
                                src={issue.image || "https://via.placeholder.com/300"}
                                alt={issue.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-xl font-semibold mt-2">{issue.title}</h3>
                            <p className="text-sm text-gray-500">{issue.category}</p>
                            <p className="text-sm">{issue.location}</p>
                            <p className="font-semibold mt-1">Budget: ${issue.amount}</p>
                            <Link
                                to={`/issue/${issue._id}`}
                                className="mt-auto btn btn-primary w-full text-center bg-linear-to-r from-[#574bc7] to-[#8eb4fa] text-white font-extrabold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:shadow-[0_0_20px_rgba(255,0,255,0.8)] transition duration-300 ease-in-out"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentComplaints;
