import axios from "axios";
import Header from "./Header"
import Footer from "./Footer"
import { format } from 'date-fns';




function Events(props) {

	const openAddNewEventForm = () => {
		window.open("/new-event-form", "_blank", "width=600,height=400");
	};

	const modifyEvent = () => {

	};

	const handleDeleteEvent = async (eventID) => {
		if (!window.confirm("Are you sure you want to delete this event?")) return;

		try {
			await axios.delete(`http://localhost:5000/api/events/${eventID}`);
			alert("Event deleted successfully!");
		} catch (error) {
			console.error("Error deleting event:", error);
			alert("Failed to delete event. Please try again.");
		}
	};

	return (
		<div>
			<h1>Events</h1>

			<button onClick = {openAddNewEventForm}>Add New Event</button>

			<table>
				<thead>
					<tr>
						<th>
							Event ID
						</th>
						<th>
							Name
						</th>
						<th>
							Capacity
						</th>
						<th>
							Address
						</th>
						<th>
							Date
						</th>
						<th>
							Time
						</th>
						<th>
							Weapon
						</th>
						<th>
							Category
						</th>
						<th>
							Gender
						</th>
						<th>
							Modify/Delete
						</th>
					</tr>
				</thead>
				<tbody>
					{props.events.map(event => (
						<tr key={event.eventID}>
							<td>
								{event.eventID}
							</td>
							<td>
								{event.name}
							</td>
							<td>
								{event.capacity == null ? "No Limit" : event.capacity}
							</td>
							<td>
								{event.address}
							</td>
							<td>
								{new Date(event.startTime).toDateString()}
							</td>
							<td>
								{new Date(event.startTime).toLocaleTimeString()}
							</td>
							<td>
								{event.weapon}
							</td>
							<td>
								{event.category}
							</td>
							<td>
								{event.eventGender}
							</td>
							<td>
								<button onClick={modifyEvent}>Modify</button>
								<button onClick={() => handleDeleteEvent(event.eventID)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Footer />
		</div>
	)
}

export default Events