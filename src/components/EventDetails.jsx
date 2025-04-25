import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EventDetails = () => {
	const { eventID } = useParams();
	const [event, setEvent] = useState(null);

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

			{/* TODO: Add preliminary seeding, pool results, DE tableau, etc. */}
		</div>
	);
};

export default EventDetails;
