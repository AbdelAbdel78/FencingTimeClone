import { createClient } from '../db.js';

export default async function handler(req, res) {
  const { eventID } = req.query;
  const client = createClient();
  try {
    await client.connect();
    if (req.method === 'GET') {
      const result = await client.query(`SELECT * FROM events WHERE "eventID" = $1`, [eventID]);
      if (result.rows.length === 0) return res.status(404).send('Event not found');
      res.json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { name, capacity, address, weapon, category, eventGender, startTime } = req.body;
      await client.query(
        `UPDATE events SET "name"=$2,"capacity"=$3,"address"=$4,"weapon"=$5,"category"=$6,"eventGender"=$7,"startTime"=$8 WHERE "eventID"=$1`,
        [eventID, name, capacity, address, weapon, category, eventGender, startTime]
      );
      res.send('Event edited successfully');
    } else if (req.method === 'DELETE') {
      await client.query(`DELETE FROM events WHERE "eventID" = $1`, [eventID]);
      res.send('Event deleted successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with event');
  } finally {
    await client.end();
  }
}