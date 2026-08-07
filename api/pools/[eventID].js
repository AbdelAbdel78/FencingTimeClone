import { createClient } from '../db.js';

export default async function handler(req, res) {
  const { eventID } = req.query;
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM pools WHERE "eventID" = $1`, [eventID]);
    if (result.rows.length === 0) return res.status(404).send('Pool not found');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching pools');
  } finally {
    await client.end();
  }
}