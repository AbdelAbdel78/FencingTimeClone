

export const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Adjust age if the birth date hasn't occurred yet this year
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const getRating = (event, fencer) => {
    if (event.weapon === "Foil") return fencer.foilRating;
    if (event.weapon === "Epee") return fencer.epeeRating;
    return fencer.saberRating;
};
