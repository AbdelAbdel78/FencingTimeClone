import { createClient } from '../db.js';

export default async function handler(req, res) {
  const { poolID } = req.query;
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      `SELECT pb.*, fa."firstName" AS "fencerA_first", fa."lastName" AS "fencerA_last", fb."firstName" AS "fencerB_first", fb."lastName" AS "fencerB_last"
       FROM pool_bouts pb
       JOIN fencers fa ON pb."fencerA" = fa."memberID"
       JOIN fencers fb ON pb."fencerB" = fb."memberID"
       WHERE pb."poolID" = $1`,
      [poolID]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching bouts');
  } finally {
    await client.end();
  }
}