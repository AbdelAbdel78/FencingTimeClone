import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EventDetails = () => {
    const { eventID } = useParams();
    const [event, setEvent] = useState(null);
    const [eventFencers, setEventFencers] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${eventID}`);
                setEvent(res.data);
            } catch (err) {
                console.error("Error fetching event:", err);
            }
        };
        fetchEvent();
    }, [eventID]);

    useEffect(() => {
		const fetchRegistrations = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/event_fencers/${eventID}`);
				setEventFencers(response.data);
			} catch (err) {
				console.error("Error fetching event fencers:", err);
			}
		};
		fetchRegistrations();
	}, [eventID]);

    if (!event) return <p>Loading...</p>;

    return (
        <div>
            <h1>{event.name}</h1>
            <p>Date: {new Date(event.startTime).toDateString()}</p>
            <p>Time: {new Date(event.startTime).toLocaleTimeString()}</p>
            <p>Address: {event.address}</p>
            <p>Weapon: {event.weapon}</p>
            <p>Category: {event.category}</p>
            <p>Gender: {event.eventGender}</p>

            <h2>Registered Fencers</h2>
            {eventFencers.length === 0 ? (
                <p>No fencers registered yet.</p>
            ) : (
                <ul>
                    {eventFencers.map((fencer) => (
                        <li key={fencer.memberID}>
                            Member #{fencer.memberID}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventDetails;