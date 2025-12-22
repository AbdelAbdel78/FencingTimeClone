import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Header from './components/Header';
import Fencers from './components/Fencers';
import Events from './components/Events';
import AddNewFencerForm from './components/AddNewFencerForm';
import AddNewEventForm from './components/AddNewEventForm';
import EditFencerForm from './components/EditFencerForm';
import EditEventForm from './components/EditEventForm';
import EventDetails from './components/EventDetails'; 

const AppRouter = () => {
	const [fencers, setFencers] = useState([]);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/api/fencers')
			.then(response => {
				setFencers(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error.response || error.message);
			});
	}, [fencers]);

	useEffect(() => {
		axios.get('http://localhost:5000/api/events')
			.then(response => {
				setEvents(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			})
	}, [events]);

	const webPageName = useLocation().pathname;

	return (
		<div>
			{!webPageName.startsWith("/new") && !webPageName.startsWith("/edit") &&
				<nav>
					<Link to="/">
						<button>Home</button>
					</Link>
					<Link to="/fencers">
						<button>Fencers</button>
					</Link>
					<Link to="/events">
						<button>Events</button>
					</Link>
				</nav>
			}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/fencers" element={<Fencers fencers={fencers} />} />
				<Route path="/new-fencer-form" element={<AddNewFencerForm />} />
				<Route path="/edit-fencer-form/:memberID" element={<EditFencerForm />} />
				<Route path="/events" element={<Events events={events} />} />
				<Route path="/new-event-form" element={<AddNewEventForm />} />
				<Route path="/edit-event-form/:eventID" element={<EditEventForm />} />
				<Route path="/events/:eventID" element={<EventDetails />} />
			</Routes>
		</div>
	);
};

const App = () => (
	<Router>
		<AppRouter />
	</Router>
);

export default App;