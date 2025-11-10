// MyIssues.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Loader from "../Components/Loader";

const MyIssues = () => {
    const { user } = useAuth(); // logged-in user
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        title: "",
        category: "",
        amount: "",
        description: "",
        status: "ongoing",
    });

    // fetch logged-in user's issues
    const fetchMyIssues = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/issues", {
                params: { email: user.email }, // only this user's issues
            });
            setIssues(res.data);
        } catch (err) {
            toast.error("Failed to load your issues!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchMyIssues = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/add-issue", {
                    params: { email: user.email }, // fetch only user's issues
                });
                // filter manually on frontend if backend doesn't support email param
                const myIssues = res.data.filter(issue => issue.email === user.email);
                setIssues(myIssues);
            } catch (err) {
                toast.error("Failed to load your issues!");
            } finally {
                setLoading(false);
            }
        };
        fetchMyIssues();
    }, [user.email]);

    // open update modal
    const openUpdateModal = (issue) => {
        setSelectedIssue(issue);
        setUpdateData({
            title: issue.title,
            category: issue.category,
            amount: issue.amount,
            description: issue.description,
            status: issue.status,
        });
        setShowUpdateModal(true);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    // submit update
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/issues/${selectedIssue._id}`,
                updateData
            );
            toast.success("Issue updated successfully!");
            // refresh issues
            fetchMyIssues();
            setShowUpdateModal(false);
        } catch (err) {
            toast.error("Failed to update issue!");
        }
    };

    // open delete modal
    const openDeleteModal = (issue) => {
        setSelectedIssue(issue);
        setShowDeleteModal(true);
    };

    // delete issue
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/issues/${selectedIssue._id}`);
            toast.success("Issue deleted successfully!");
            // refresh issues
            fetchMyIssues();
            setShowDeleteModal(false);
        } catch (err) {
            toast.error("Failed to delete issue!");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">My Issues</h2>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-3 py-2">Title</th>
                        <th className="border px-3 py-2">Category</th>
                        <th className="border px-3 py-2">Amount</th>
                        <th className="border px-3 py-2">Status</th>
                        <th className="border px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((issue) => (
                        <tr key={issue._id}>
                            <td className="border px-3 py-2">{issue.title}</td>
                            <td className="border px-3 py-2">{issue.category}</td>
                            <td className="border px-3 py-2">${issue.amount}</td>
                            <td className="border px-3 py-2">{issue.status}</td>
                            <td className="border px-3 py-2 space-x-2">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => openUpdateModal(issue)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => openDeleteModal(issue)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
                        <h3 className="text-xl font-bold mb-4">Update Issue</h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-3">
                            <input
                                name="title"
                                value={updateData.title}
                                onChange={handleUpdateChange}
                                placeholder="Title"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="category"
                                value={updateData.category}
                                onChange={handleUpdateChange}
                                placeholder="Category"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="amount"
                                type="number"
                                value={updateData.amount}
                                onChange={handleUpdateChange}
                                placeholder="Amount"
                                className="input input-bordered w-full"
                                required
                            />
                            <textarea
                                name="description"
                                value={updateData.description}
                                onChange={handleUpdateChange}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                                required
                            />
                            <div>
                                <label className="mr-2 font-semibold">Status:</label>
                                <select
                                    name="status"
                                    value={updateData.status}
                                    onChange={handleUpdateChange}
                                    className="select select-bordered"
                                >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="ended">Ended</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowUpdateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-sm relative">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete "{selectedIssue.title}"?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-error" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyIssues;
