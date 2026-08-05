import { createClient } from './db.js';

export default async function handler(req, res) {
  const client = createClient();
  try {
    await client.connect();
    if (req.method === 'GET') {
      const result = await client.query(`SELECT * FROM fencers ORDER BY "lastName"`);
      res.json(result.rows);
    } else if (req.method === 'POST') {
      const { firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating } = req.body;
      await client.query(
        `INSERT INTO fencers ("firstName","lastName","club","gender","birthdate","foilRating","epeeRating","saberRating") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating]
      );
      res.send('Fencer added successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with fencers');
  } finally {
    await client.end();
  }
}