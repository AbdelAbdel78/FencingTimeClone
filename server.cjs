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

// PostgreSQL Database Configuration
const dbConfig = {
    user: process.env.DB_USER,      // Database user
    host: process.env.DB_SERVER,    // Database server (e.g., localhost)
    database: process.env.DB_NAME,  // Database name
    password: process.env.DB_PASSWORD, // Database password
    port: 5432,                     // Default PostgreSQL port
};

// Select all fencers
app.get("/api/fencers", async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query("SELECT * FROM fencers");
        res.json(result.rows); // PostgreSQL returns rows in `result.rows`
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    } finally {
        await client.end(); // Close the connection
    }
});

// Select all events
app.get("/api/events", async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query("SELECT * FROM events");
        res.json(result.rows); // PostgreSQL returns rows in `result.rows`
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    } finally {
        await client.end(); // Close the connection
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
