import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Loader from "../Components/Loader";

const Contribution = () => {
    const { user } = useAuth();
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const res = await axios.get(
                    `https://community-clean-server-rep.vercel.app/api/contributions?email=${user?.email}`
                );
                setContributions(res.data || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch contributions!");
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchContributions();
    }, [user]);

    const handleDownloadPDF = () => {
        if (!contributions.length) {
            toast.info("No contributions found to download.");
            return;
        }
        console.log("Download button clicked!");

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("My Contribution Report", 14, 15);

        doc.setFontSize(12);
        doc.text(`User: ${user?.email}`, 14, 25);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 32);

        const tableColumn = ["Issue Title", "Category", "Amount ($)", "Date"];
        const tableRows = contributions.map((c) => [
            c.issueTitle || "N/A",
            c.category || "N/A",
            c.amount ? `$${c.amount}` : "$0",
            new Date(c.date).toLocaleDateString(),
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
        });

        doc.save("My_Contribution_Report.pdf");
    };

    if (loading) return <Loader />;

    if (!contributions.length)
        return (
            <p className="text-center mt-10">
                You have not made any contributions yet.
            </p>
        );

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                My Contributions
            </h2>

            <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-3 mb-4">
                <button
                    onClick={handleDownloadPDF}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto text-center"
                >
                    📄 Download Full Report (PDF)
                </button>
            </div>

            {/* Responsive table container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="table-auto w-full border-collapse text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-3 sm:px-4 py-2 border">Issue Title</th>
                            <th className="px-3 sm:px-4 py-2 border">Category</th>
                            <th className="px-3 sm:px-4 py-2 border">Paid Amount</th>
                            <th className="px-3 sm:px-4 py-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributions.map((c, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 text-gray-800 transition-colors"
                            >
                                <td className="px-3 sm:px-4 py-2 border break-words">
                                    {c.issueTitle || "N/A"}
                                </td>
                                <td className="px-3 sm:px-4 py-2 border break-words">
                                    {c.category || "N/A"}
                                </td>
                                <td className="px-3 sm:px-4 py-2 border">
                                    ${c.amount ?? "0"}
                                </td>
                                <td className="px-3 sm:px-4 py-2 border">
                                    {new Date(c.date).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contribution;
