import pkg from 'pg';
const { Client } = pkg;

export function createClient() {
  return new Client({
    user: process.env.DB_USER,
    host: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false },
  });
}