const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
var query;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	host: "localhost", // MySQL host (or a remote server address)
	user: "root", // Your MySQL username
	password: "password", // Your MySQL password
	database: "fencingtimeclone", // The database you created
});

db.connect((err) => {
	if (err) {
		console.error("Error connecting to MySQL:", err);
		return;
	}
	console.log("Connected to MySQL");
});

// Define a simple API to fetch users
app.get("/api/fencers", (req, res) => {
	query = "SELECT * FROM fencers";
	db.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(results);
	});
});

app.get("/api/events", (req, res) => {
	query = "SELECT * FROM events";
	db.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(results);
	})
});

app.get("/api/competedin", (req, res) => {
	query = "SELECT * FROM competedin, events, fencers WHERE competedin.eID = events.eventID AND competedin.mID = fencers.memberID";
	db.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(results);
	})
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
