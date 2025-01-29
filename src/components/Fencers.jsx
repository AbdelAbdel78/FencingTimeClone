import Header from "./Header"
import Footer from "./Footer"
import {calculateAge} from "./Utils";

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
							Gender
						</th>
						<th>
							Age
						</th>
						<th>
							Birthdate
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
								{fencer.gender ? "M" : "F"}
							</td>
							<td>
                				{calculateAge(fencer.birthdate)} {/* Calculate and display age */}
							</td>
							<td>
								{new Date(fencer.birthdate).toLocaleDateString()} {/* Display birthdate */}
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