import Header from "./Header"
import Footer from "./Footer"
import { format } from 'date-fns';




function Events(props) {

	const openAddNewEventForm = () => {
		window.open("/new-event-form", "_blank", "width=600,height=400");
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
							Location
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
								{event.capacity === null ? "No Limit" : event.capacity}
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
						</tr>
					))}
				</tbody>
			</table>

			<Footer />
		</div>
	)
}

export default Events