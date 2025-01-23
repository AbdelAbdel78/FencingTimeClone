import Header from "./Header"
import Footer from "./Footer"

function Fencers(props) {

	const openAddNewFencerForm = () => {
		window.open("/new-fencer-form", "_blank", "width=600,height=400");
	};

	const calculateAge = (birthdate) => {
		const today = new Date();
		const birthDate = new Date(birthdate);
		var age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth();
		const day = today.getDate();
	
		// Adjust age if the birth date hasn't occurred yet this year
		if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
			age--;
		}
		return age;
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
						<tr key={fencer.member_id}>
							<td>
								{fencer.member_id}
							</td>
							<td>
								{fencer.first_name}
							</td>
							<td>
								{fencer.last_name}
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
								{fencer.foil_rating}
							</td>
							<td>
								{fencer.epee_rating}
							</td>
							<td>
								{fencer.saber_rating}
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