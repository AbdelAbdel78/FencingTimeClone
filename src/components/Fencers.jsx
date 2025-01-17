import Header from "./Header"
import Footer from "./Footer"

function Fencers(props) {

	const openAddNewFencerForm = () => {
		window.open("/new-fencer-form", "_blank", "width=600,height=400");
	};

	return (
		<div>
			<h1>Fencers</h1>

			<button onClick = {openAddNewFencerForm}>Add New Fencer</button>

			<table>
				<thead>
					<tr>
						<th>
							Member ID
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
							Age
						</th>
						<th>
							Gender
						</th>
						<th>
							Foil Rating
						</th>
						<th>
							Epee Rating
						</th>
						<th>
							Saber Rating
						</th>
					</tr>
				</thead>
				<tbody>
					{props.fencers.map(fencer => (
						<tr key={fencer.memberID}>
							<td>
								{fencer.memberID}
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
								{fencer.age}
							</td>
							<td>
								{fencer.gender == 0 ? "M" : "F"}
							</td>
							<td>
								{fencer.foilRating}
							</td>
							<td>
								{fencer.epeeRating}
							</td>
							<td>
								{fencer.saberRating}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Footer />
		</div>
	)
}

export default Fencers