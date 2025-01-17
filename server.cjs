const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Azure SQL Database Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use encryption for Azure
        trustServerCertificate: false,
    },
};

// Select all fencers
app.get("/api/fencers", async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query("SELECT * FROM fencers");
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

// Insert a new user
app.post("/api/users", async (req, res) => {
    const { name, email } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool
            .request()
            .input("name", sql.NVarChar, name)
            .input("email", sql.NVarChar, email)
            .query("INSERT INTO Users (Name, Email) VALUES (@name, @email)");
        res.send("User added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting data");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
