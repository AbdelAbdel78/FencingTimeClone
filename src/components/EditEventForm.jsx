import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditEventForm = () => {
	const { eventID } = useParams();
	const [editEvent, setEditEvent] = useState(null); // Start with null

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/events/${eventID}`);
                
				const formattedStartTime = (dateString) => {
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const localDate = new Date(date.getTime() - offset * 60000);
                    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
                };
    
                setEditEvent({
                    ...response.data,
                    startTime: formattedStartTime(response.data.startTime),
                });
			} catch (err) {
				console.error("Error fetching event:", err);
			}
		};
		fetchEvent();
	}, [eventID]);

	if (!editEvent) return <div>Loading...</div>;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditEvent((f) => ({ ...f, [name]: value }));
	};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send data to the backend
            await axios.put(`http://localhost:5000/api/events/${editEvent.eventID}`, editEvent);
            alert("Event edited successfully!");
        } catch (error) {
            console.error("Error editing event:", error);
            alert("Failed to edit event. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Event</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={editEvent.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Capacity:
                <input 
                    type="number"
                    name="capacity"
                    defaultValue={0}
                    value={editEvent.capacity}
                    onChange={handleChange}
                    required
                    min={0}
                />
                <br />
                Set 0 for no limit
            </label>
            <br />
            <label htmlFor="">
                Address:
                <input
                    type="text"
                    name="address"
                    value={editEvent.address}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Time:
                <input
                    type="datetime-local"
                    name="startTime"
                    value={editEvent.startTime}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Weapon:
                <select
                    name="weapon"
                    defaultValue=""
                    value={editEvent.weapon}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Choose Weapon</option>
                    <option value="Foil">Foil</option>
                    <option value="Epee">Epee</option>
                    <option value="Saber">Saber</option>
                </select>
            </label>
            <br />
            <label>
                Category:
                <select
                    name="category"
                    defaultValue=""
                    value={editEvent.category}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Choose Category</option>
                    <option value="Y8">Y8</option>
                    <option value="Y10">Y10</option>
                    <option value="Y12">Y12</option>
                    <option value="Y14">Y14</option>
                    <option value="Cadet">Cadet</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Veteran">Veteran</option>
                    <option value="Division III">Division III</option>
                    <option value="Division II">Division II</option>
                    <option value="Division IA">Division IA</option>
                    <option value="Division I">Division I</option>
                </select>
            </label>
            <br />
            <label>
                Gender:
                <select
                    name="eventGender"
                    defaultValue=""
                    value={editEvent.eventGender}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Choose Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Mixed">Mixed</option>
                </select>
            </label>
            <br />

            <button type="submit">Edit Event</button>

            <br />{editEvent.name} {editEvent.capacity != null ? editEvent.capacity : "null"} {editEvent.address} {editEvent.startTime} {editEvent.weapon} {editEvent.category} {editEvent.eventGender}
        </form>
    );
}

export default EditEventForm;
