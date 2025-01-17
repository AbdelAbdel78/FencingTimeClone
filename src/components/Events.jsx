import Header from "./Header"
import Footer from "./Footer"

function Events(props) {

	const openAddNewEventForm = () => {
		window.open("/new-event-form", "_blank", "width=600,height=400");
	};

	return (
		<div>
			<h1>Events</h1>

			<button onClick = {openAddNewEventForm}>Add New Event</button>

			<Footer />
		</div>
	)
}

export default Events