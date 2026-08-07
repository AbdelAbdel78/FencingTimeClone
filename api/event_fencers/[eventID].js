import { createClient } from '../db.js';

export default async function handler(req, res) {
  const { eventID } = req.query;
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `SELECT * FROM event_fencers JOIN fencers ON event_fencers."memberID" = fencers."memberID" WHERE event_fencers."eventID" = $1`,
      [eventID]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching event fencers');
  } finally {
    await client.end();
  }
}