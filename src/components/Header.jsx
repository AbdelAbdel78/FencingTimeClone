

function Header() {
    return (
		<div>
			<h1>Fencers</h1>
			<ul>
				{props.fencers.map(fencer => (
					<li key={fencer.memberID}>
						{fencer.lastName}, {fencer.firstName}
					</li>
				))}
			</ul>

			<h1>Events</h1>
			<ul>
				{props.events.map(event => (
					<li key={event.eventID}>
						{event.classification} {event.gender} {event.weapon}
					</li>
				))}
			</ul>

			<h1>Competed In</h1>
			<ul>
				{props.competedIn.map(competed => (
					<li key={`${competed.eventID}-${competed.memberID}`}>
						{competed.firstName} fenced in {competed.classification} {competed.gender} {competed.weapon}
					</li>
				))}
			</ul>
			<Footer />
		</div>
    )
}

export default Header