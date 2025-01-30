import React, { useState } from "react";
import axios from "axios";

const AddNewEventForm = () => {

    const [newEvent, setNewEvent] = useState({
        name: "",
        capacity: 0,
        address: "",
        startTime: "",
        weapon: "",
        category: "",
        eventGender: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(e => ({...e, [name]: value == 0 ? null : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send data to the backend
            await axios.post("http://localhost:5000/api/events", newEvent);
            alert("Event added successfully!");
            setNewEvent({
                name: "",
                capacity: null,
                address: "",
                startDate: "",
                startTime: "",
                weapon: "",
                category: "",
                eventGender: ""
            });
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Failed to add event. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Event</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
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
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Choose Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Mixed">Mixed</option>
                </select>
            </label>
            <br />

            <button type="submit">Add Event</button>

            <br />{newEvent.name} {newEvent.capacity ? newEvent.capacity : "null"} {newEvent.address} {newEvent.startTime} {newEvent.weapon} {newEvent.category} {newEvent.eventGender}
        </form>
    );
}

export default AddNewEventForm