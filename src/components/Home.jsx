import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	return (
		<div className="home">
			<h1>Fencing Time</h1>
			<p className="home-subtitle">
				A tournament and event management app for fencing clubs, built
				to track fencers, organize events, and run pools from
				registration through the final bout.
			</p>

			<div className="home-links">
				<Link to="/fencers">
					<button>View Fencers</button>
				</Link>
				<Link to="/events">
					<button>View Events</button>
				</Link>
			</div>

			<p className="home-note">
				A personal full-stack project built with React, Express, and
				PostgreSQL.
			</p>
		</div>
	);
}

export default Home;