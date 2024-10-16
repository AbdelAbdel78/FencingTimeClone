import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
	const [fencers, setFencers] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/api/fencers')
			.then(response => {
				setFencers(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}, []);

	return (
		<div>
			<h1>Fencerss</h1>
			<ul>
				{fencers.map(fencer => (
					<li key={fencer.memberID}>
						{fencer.firstName} - {fencer.lastName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
