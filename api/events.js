import { createClient } from './db.js';

export default async function handler(req, res) {
  const client = createClient();
  try {
    await client.connect();
    if (req.method === 'GET') {
      const result = await client.query(`SELECT * FROM events ORDER BY "startTime"`);
      res.json(result.rows);
    } else if (req.method === 'POST') {
      const { name, capacity, address, startTime, weapon, category, eventGender } = req.body;
      await client.query(
        `INSERT INTO events ("name","capacity","address","startTime","weapon","category","eventGender") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [name, capacity, address, startTime, weapon, category, eventGender]
      );
      res.send('Event added successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with events');
  } finally {
    await client.end();
  }
}