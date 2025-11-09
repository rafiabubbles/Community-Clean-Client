// Contribution.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const Contribution = () => {
    const { user } = useAuth(); // get current logged-in user
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/contributions?email=${user.email}`);
                setContributions(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch contributions!");
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchContributions();
        }
    }, [user]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    if (!contributions.length)
        return <p className="text-center mt-10">You have not made any contributions yet.</p>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">My Contributions</h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Issue Title</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Paid Amount</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Download Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributions.map((c, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{c.issueTitle || "N/A"}</td>
                                <td className="px-4 py-2 border">{c.category || "N/A"}</td>
                                <td className="px-4 py-2 border">${c.amount}</td>
                                <td className="px-4 py-2 border">{new Date(c.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border text-center">
                                    <a
                                        href={`http://localhost:5000/api/contributions/${c._id}/report`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-primary"
                                    >
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contributio;
