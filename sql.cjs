const sql = require("mssql");
const dbConfig = {
    user: "CloudSA3fe84517",
    password: "Password1",
    server: "abdel-local.database.windows.net",
    database: "FencingTimeClone",
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

async function testConnection() {
    try {
        let pool = await sql.connect(dbConfig);
        console.log("Connected to Azure SQL Database!");
        pool.close();
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

testConnection();
