import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditFencerForm = () => {
	const { memberID } = useParams();
	const [editFencer, setEditFencer] = useState(null); // Start with null

	useEffect(() => {
		const fetchFencer = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/fencers/${memberID}`);
				setEditFencer(response.data);
			} catch (err) {
				console.error("Error fetching fencer:", err);
			}
		};
		fetchFencer();
	}, [memberID]);

	if (!editFencer) return <div>Loading...</div>;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditFencer((f) => ({ ...f, [name]: value }));
	};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send data to the backend
            await axios.put(`http://localhost:5000/api/fencers/${editFencer.memberID}`, editFencer);
            alert("Fencer edited successfully!");
        } catch (error) {
            console.error("Error editing fencer:", error);
            alert("Failed to edit fencer. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Fencer</h2>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={editFencer.firstName}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={editFencer.lastName}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Club:
                <input
                    type="text"
                    name="club"
                    value={editFencer.club}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Gender:
                <select
                    name="gender"
                    defaultValue=""
                    value={editFencer.gender}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Choose Gender</option>
                    <option value={true}>Male</option>
                    <option value={false}>Female</option>
                </select>
            </label>
            <br />
            <label>
                Birthdate:
                <input
                    type="date"
                    name="birthdate"
                    value={editFencer.birthdate}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Foil Rating:
                <input
                    type="text"
                    name="foilRating"
                    value={editFencer.foilRating}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Epee Rating:
                <input
                    type="text"
                    name="epeeRating"
                    value={editFencer.epeeRating}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Saber Rating:
                <input
                    type="text"
                    name="saberRating"
                    value={editFencer.saberRating}
                    onChange={handleChange}
                />
            </label>
            <br />

            <button type="submit">Edit Fencer</button>

            <br />{editFencer.firstName} {editFencer.lastName} {editFencer.club} {editFencer.gender} {editFencer.birthdate} {editFencer.foilRating} {editFencer.epeeRating} {editFencer.saberRating}
        </form>
    );
};

export default EditFencerForm;
