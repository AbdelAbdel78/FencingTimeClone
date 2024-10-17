import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './components/main';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
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
		<>
			<Header />
			<Main />
			<Footer />

			<h1>Fencers</h1>
			<ul>
				{fencers.map(fencer => (
					<li key={fencer.memberID}>
						{fencer.lastName}, {fencer.firstName}
					</li>
				))}
			</ul>

			<h1>Events</h1>
			<ul>
				{events.map(event => (
					<li key = {event.eventID}>
						{event.classification} {event.gender} {event.weapon}
					</li>
				))}
			</ul>

			<h1>Competed In</h1>
			<ul>
				{competedIn.map(competed => (
					<li key = {`${competed.eventID}-${competed.memberID}`}>
						{competed.firstName} fenced in {competed.classification} {competed.gender} {competed.weapon}
					</li>
				))}
			</ul>
		</>
	);
};

export default App;
