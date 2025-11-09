import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const AllIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                // Using /api/add-issue endpoint to fetch all issues, which is correct based on our previous discussion
                const res = await axios.get("http://localhost:5000/api/add-issue");
                setIssues(res.data);
            } catch (err) {
                toast.error("Failed to load issues!");
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);

    if (loading) return <Loader />;

    return (
        // *** The overflow-x-hidden class is already here, which prevents the horizontal scrollbar. ***
        <div className="max-w-7xl mx-auto px-4 md:px-10 overflow-x-hidden">
            <h2 className="text-3xl font-bold mb-6 text-center">All Issues</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                                className="mt-auto btn btn-primary w-full text-center"
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

export default AllIssues;