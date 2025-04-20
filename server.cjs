const express = require("express");
const { Client } = require("pg"); // Use pg client for PostgreSQL
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL Cloud SQL Database Configuration
const dbConfig = {
    user: process.env.DB_USER,      // Your PostgreSQL username
    host: process.env.DB_SERVER, // Cloud SQL socket address
    database: process.env.DB_NAME,  // Your database name
    password: process.env.DB_PASSWORD, // Your database password
    port: 5432,                     // Default PostgreSQL port
};

// Select all fencers
app.get("/api/fencers", async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM fencers ORDER BY "lastName"`);
        res.json(result.rows); // PostgreSQL returns rows in `result.rows`
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    } finally {
        await client.end(); // Close the connection
    }
});

// Get an existing fencer
app.get("/api/fencers/:memberID", async (req, res) => {
    const { memberID } = req.params;
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = `SELECT * FROM fencers WHERE "memberID" = $1`;
        const result = await client.query(query, [memberID]);
        if (result.rows.length === 0) {
            return res.status(404).send("Fencer not found");
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching fencer");
    } finally {
        await client.end(); // Close the connection
    }
});

// Insert a new fencer
app.post("/api/fencers", async (req, res) => {
    const { firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating } = req.body;
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = `INSERT INTO fencers ("firstName", "lastName", "club", "gender", "birthdate", "foilRating", "epeeRating", "saberRating") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        await client.query(query, [firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating]);
        res.send("Fencer added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting data");
    } finally {
        await client.end(); // Close the connection
    }
});

// Edit a existing fencer
app.put("/api/fencers/:memberID", async (req, res) => {
    const { memberID } = req.params;
    const { firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating } = req.body;
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = `UPDATE fencers SET "firstName" = $2, "lastName" = $3, "club" = $4, "gender" = $5, "birthdate" = $6, "foilRating" = $7, "epeeRating" = $8, "saberRating" = $9 WHERE "memberID" = $1`;
        await client.query(query, [memberID, firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating]);
        res.send("Fencer edited successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error editing data");
    } finally {
        await client.end(); // Close the connection
    }
});

// Delete an existing fencer
app.delete("/api/fencers/:memberID", async (req, res) => {
    const { memberID } = req.params;
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = `DELETE FROM fencers WHERE "memberID" = $1`;
        await client.query(query, [memberID]);
        res.send("Fencer deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting fencer");
    } finally {
        await client.end(); // Close the connection
    }
});

// Select all events
app.get("/api/events", async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM events ORDER BY "startTime"`);
        res.json(result.rows); // PostgreSQL returns rows in `result.rows`
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    } finally {
        await client.end(); // Close the connection
    }
});

// Insert a new event
app.post("/api/events", async (req, res) => {
    const { name, capacity, address, startTime, weapon, category, eventGender } = req.body;
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = `
            INSERT INTO events ("name", "capacity", "address", "startTime", "weapon", "category", "eventGender")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await client.query(query, [name, capacity, address, startTime, weapon, category, eventGender]);
        res.send("Event added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting data");
    } finally {
        await client.end(); // Close the connection
    }
});

// Delete an existing event
app.delete("/api/events/:eventID", async (req, res) => {
    const { eventID } = req.params;
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = `DELETE FROM events WHERE "eventID" = $1`;
        await client.query(query, [eventID]);
        res.send("Fencer deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting fencer");
    } finally {
        await client.end(); // Close the connection
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
