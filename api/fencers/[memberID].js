import { createClient } from '../db.js';

export default async function handler(req, res) {
  const { memberID } = req.query;
  const client = createClient();
  try {
    await client.connect();
    if (req.method === 'GET') {
      const result = await client.query(`SELECT * FROM fencers WHERE "memberID" = $1`, [memberID]);
      if (result.rows.length === 0) return res.status(404).send('Fencer not found');
      res.json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating } = req.body;
      await client.query(
        `UPDATE fencers SET "firstName"=$2,"lastName"=$3,"club"=$4,"gender"=$5,"birthdate"=$6,"foilRating"=$7,"epeeRating"=$8,"saberRating"=$9 WHERE "memberID"=$1`,
        [memberID, firstName, lastName, club, gender, birthdate, foilRating, epeeRating, saberRating]
      );
      res.send('Fencer edited successfully');
    } else if (req.method === 'DELETE') {
      await client.query(`DELETE FROM fencers WHERE "memberID" = $1`, [memberID]);
      res.send('Fencer deleted successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with fencer');
  } finally {
    await client.end();
  }
}