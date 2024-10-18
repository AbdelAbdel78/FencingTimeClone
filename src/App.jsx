import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Fencers from './components/Fencers';
import Events from './components/Events';

const AppRouter = () => {
	const [fencers, setFencers] = useState([]);
	const [events, setEvents] = useState([]);
	const [competedIn, setCompetedIn] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/api/fencers')
			.then(response => {
				setFencers(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
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

	useEffect(() => {
		axios.get('http://localhost:5000/api/competedin')
			.then(response => {
				setCompetedIn(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			})
	}, [competedIn]);

	return (
		<div>

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

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/fencers" element={<Fencers fencers = {fencers} events = {events} competedIn = {competedIn} />} />
				<Route path="/events" element={<Events />} />
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