import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function AddMaintenanceLog() {
    const [description, setDescription] = useState("");
    const [performedBy, setPerformedBy] = useState("");
    const [wellId, setWellId] = useState("");
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5001/api/maintenance",
                {
                    description,
                    performed_by: performedBy,
                    well_id: wellId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Maintenance log added!");
            setDescription("");
            setPerformedBy("");
            setWellId("");
        } catch (err) {
            console.error("Failed to add log:", err);
            alert("Error adding log");
        }
    };

    return (
        <div>
            <h2>Add Maintenance Log</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Performed By"
                        value={performedBy}
                        onChange={(e) => setPerformedBy(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Well ID"
                        value={wellId}
                        onChange={(e) => setWellId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Log</button>
            </form>
        </div>
    );
}

export default AddMaintenanceLog;
