
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <div className="text-center py-10">Loading...</div>;

    if (!user) {
        // Show alert only once when trying to access protected route
        Swal.fire({
            icon: "warning",
            title: "Access Denied ⚠️",
            text: "You need to log in first to access this page.",
            timer: 2000,
            showConfirmButton: false,
        });

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
