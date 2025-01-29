import React, { useState } from "react";
import axios from "axios";

const AddNewFencerForm = () => {

    const [newFencer, setNewFencer] = useState({
        firstName: "",
        lastName: "",
        club: "",
        gender: true,
        birthdate: "",
        foilRating: "",
        epeeRating: "",
        saberRating: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFencer(f => ({...f, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send data to the backend
            await axios.post("http://localhost:5000/api/fencers", newFencer);
            alert("Fencer added successfully!");
            setNewFencer({
                firstName: "",
                lastName: "",
                club: "",
                gender: "",
                birthdate: "",
                foilRating: "",
                epeeRating: "",
                saberRating: "",
            });
        } catch (error) {
            console.error("Error adding fencer:", error);
            alert("Failed to add fencer. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Fencer</h2>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={newFencer.firstName}
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
                    value={newFencer.lastName}
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
                    value={newFencer.club}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Gender:
                <select
                    name="gender"
                    value={newFencer.gender}
                    onChange={handleChange}>
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
                    value={newFencer.birthdate}
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
                    value={newFencer.foilRating}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Epee Rating:
                <input
                    type="text"
                    name="epeeRating"
                    value={newFencer.epeeRating}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Saber Rating:
                <input
                    type="text"
                    name="saberRating"
                    value={newFencer.saberRating}
                    onChange={handleChange}
                />
            </label>
            <br />

            <button type="submit">Add Fencer</button>

            <br />{newFencer.firstName} {newFencer.lastName} {newFencer.club} {newFencer.gender} {newFencer.birthdate} {newFencer.foilRating} {newFencer.epeeRating} {newFencer.saberRating}
        </form>
    );
};

export default AddNewFencerForm;
