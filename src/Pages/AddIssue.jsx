// src/Pages/AddIssue.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Loader from "../Components/Loader";

const AddIssue = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Add fields not entered by user
            data.email = user?.email || "anonymous";
            data.status = "ongoing";
            data.date = new Date();

            await axios.post("http://localhost:5000/api/add-issue", data);
            toast.success("Issue added successfully!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add issue!");
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <Loader />;
    return (
        <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-2xl shadow mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Report an Issue</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Issue Title */}
                <input
                    {...register("title")}
                    placeholder="Issue Title"
                    className="input input-bordered w-full"
                    required
                />

                {/* Category Dropdown */}
                <select
                    {...register("category")}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Water Logging">Water Logging</option>
                    <option value="Street Light">Street Light</option>
                </select>

                {/* Location */}
                <input
                    {...register("location")}
                    placeholder="Location"
                    className="input input-bordered w-full"
                    required
                />

                {/* Description */}
                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    required
                />

                {/* Image URL */}
                <input
                    {...register("image")}
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                />

                {/* Suggested Fix Budget */}
                <input
                    {...register("amount")}
                    type="number"
                    placeholder="Suggested Fix Budget"
                    className="input input-bordered w-full"
                    required
                />

                {/* Email (read-only) */}
                <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Issue"}
                </button>
            </form>
        </div>
    );
};

export default AddIssue;
