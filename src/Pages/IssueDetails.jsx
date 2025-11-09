import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const IssueDetail = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState(null);
    const [contributors, setContributors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [contribution, setContribution] = useState({
        amount: "",
        name: "",
        phone: "",
        address: "",
        info: ""
    });
    const { user } = useAuth();

    useEffect(() => {
        // Fetch issue details
        axios.get(`http://localhost:5000/api/add-issue/${id}`)
            .then(res => setIssue(res.data))
            .catch(err => console.error(err));

        // Fetch contributions for this issue
        axios.get(`http://localhost:5000/api/contributions?issueId=${id}`)
            .then(res => setContributors(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleContributionChange = (e) => {
        setContribution({ ...contribution, [e.target.name]: e.target.value });
    };

    const handleContributionSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...contribution,
                issueId: id,
                email: user.email,
                date: new Date()
            };
            const res = await axios.post("http://localhost:5000/api/contributions", data);
            toast.success("Contribution submitted!");
            setShowModal(false);
            setContributors(prev => [...prev, data]); // update UI
            setContribution({ amount: "", name: "", phone: "", address: "", info: "" });
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit contribution!");
        }
    };

    if (!issue) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <img
                src={issue.image || "https://via.placeholder.com/600x300"}
                alt={issue.title}
                className="h-64 w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">{issue.title}</h2>
            <p className="text-gray-500">{issue.category} | {issue.location}</p>
            <p className="my-3">{issue.description}</p>
            <p className="font-semibold">Budget: ${issue.amount}</p>
            <p className="text-sm text-gray-400">Date: {new Date(issue.date).toLocaleDateString()}</p>

            <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary mt-4"
            >
                Pay Clean-Up Contribution
            </button>

            {/* Contribution Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
                        <h3 className="text-xl font-bold mb-4">Contribute to {issue.title}</h3>
                        <form onSubmit={handleContributionSubmit} className="space-y-3">
                            <input
                                name="amount"
                                value={contribution.amount}
                                onChange={handleContributionChange}
                                type="number"
                                placeholder="Amount"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="name"
                                value={contribution.name}
                                onChange={handleContributionChange}
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="phone"
                                value={contribution.phone}
                                onChange={handleContributionChange}
                                placeholder="Phone Number"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="address"
                                value={contribution.address}
                                onChange={handleContributionChange}
                                placeholder="Address"
                                className="input input-bordered w-full"
                                required
                            />
                            <textarea
                                name="info"
                                value={contribution.info}
                                onChange={handleContributionChange}
                                placeholder="Additional Info"
                                className="textarea textarea-bordered w-full"
                            />
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="input input-bordered w-full bg-gray-100"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Contributors Table */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-3">Contributors</h3>
                {contributors.length === 0 ? (
                    <p>No contributions yet.</p>
                ) : (
                    <table className="table-auto w-full text-left border">
                        <thead>
                            <tr>
                                <th className="px-2 py-1 border">Name</th>
                                <th className="px-2 py-1 border">Email</th>
                                <th className="px-2 py-1 border">Amount</th>
                                <th className="px-2 py-1 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributors.map((c, idx) => (
                                <tr key={idx}>
                                    <td className="px-2 py-1 border">{c.name}</td>
                                    <td className="px-2 py-1 border">{c.email}</td>
                                    <td className="px-2 py-1 border">${c.amount}</td>
                                    <td className="px-2 py-1 border">{new Date(c.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default IssueDetail;
