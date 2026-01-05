import { useParams } from "react-router-dom";
import Fencers from "./Fencers"
import { useState, useEffect } from "react";
import axios from "axios";
import {getRating} from "./Utils";
import PoolCard from "./PoolCard";

const EventDetails = () => {
    const { eventID } = useParams();
    const [event, setEvent] = useState(null);
    const [eventFencers, setEventFencers] = useState([]);
    const [eventPools, setEventPools] = useState([]);

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

    useEffect(() => {
		const fetchPools = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/pools/${eventID}`);
				setEventPools(response.data);
			} catch (err) {
				console.error("Error fetching pools:", err);
			}
		};
		fetchPools();
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
                <table>
				<thead>
					<tr>
						<th>
							Seeding
						</th>
						<th>
							First Name
						</th>
						<th>
							Last Name
						</th>
						<th>
							Club
						</th>
						<th>
							Rating
						</th>
					</tr>
				</thead>
				<tbody>
					{eventFencers.map(fencer => (
						<tr key={fencer.memberID}>
							<td>
								{fencer.seed}
							</td>
                            <td>
                                {fencer.firstName}
                            </td>
                            <td>
                                {fencer.lastName}
                            </td>
                            <td>
                                {fencer.club}
                            </td>
                            <td>
                                {getRating(event, fencer)}
                            </td>
						</tr>
					))}
				</tbody>
			</table>
            )}

            {/* <Fencers fencers={eventFencers}/> */}

            <h2>Pools</h2>
            {eventPools.length === 0 ? (
                <p>No pools available.</p>
            ) : (
                eventPools.map(pool => (
                    <div key={pool.poolID}>
                        <PoolCard pool={pool} />
                    </div>
                ))
            )}

        </div>
    );
};

export default EventDetails;