import React, { useState } from "react";
import axios from "axios";

const AddNewEventForm = () => {

    const [newEvent, setNewEvent] = useState({
        name: "",
        capacity: null,
        address: "",
        startTime: "",
        weapon: "",
        category: "",
        gender: ""
    });

    const handleChange = (e) => {

    };

    return (
        <div>
            AddNewEventForm
        </div>
    )
}

export default AddNewEventForm