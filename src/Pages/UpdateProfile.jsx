import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateUserProfile(name, photoURL);

        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Profile Updated ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/my-profile");
        } else {
            Swal.fire({
                icon: "error",
                title: "Update Failed ❌",
                text: result.message,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-purple-500">
                    Update Profile
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    type="text"
                    placeholder="Photo URL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] py-3 rounded-xl font-semibold text-white shadow-md hover:from-[#6a0dad] hover:to-[#c71585] transition"
                >
                    Update Information
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
