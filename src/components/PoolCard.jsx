import { useState, useEffect } from "react";
import axios from "axios";

const PoolCard = ({ pool }) => {
    const [poolBouts, setPoolBouts] = useState([]);

    useEffect(() => {
        if (!pool?.poolID) return; // safety check

        const fetchPoolBouts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/pool_bouts/${pool.poolID}`
                );
                setPoolBouts(res.data); // res.data is already an array
            } catch (err) {
                console.error(`Error fetching bouts for Pool ${pool.poolID}:`, err);
                setPoolBouts([]); // fallback to empty array
            }
        };

        fetchPoolBouts();
    }, [pool.poolID]);

    return (
        <div className="pool-card">
            <h3>Pool {pool.poolNumber}</h3>
            <p>Bouts: {poolBouts.length}</p>

            <table>
                <thead>
                    <tr>
                        <th>Bout ID</th>
                        <th>Fencer 1</th>
                        <th>Fencer 2</th>
                        <th>Fencer 1 Score</th>
                        <th>Fencer 2 Score</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {poolBouts.length > 0 ? (
                        poolBouts.map(bout => (
                            <tr key={bout.boutID}>
                                <td>{bout.boutID}</td>
                                <td>{bout.fencerA_first} {bout.fencerA_last}</td>
                                <td>{bout.fencerB_first} {bout.fencerB_last}</td>
                                <td>{bout.scoreA}</td>
                                <td>{bout.scoreB}</td>
                                <td>
                                    {bout.winner ? 
                                        (bout.winner === bout.fencerA ?
                                            (`${bout.fencerA_first} ${bout.fencerA_last}`) : 
                                            (`${bout.fencerB_first} ${bout.fencerB_last}`)) :
                                        ``}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No bouts available for this pool.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PoolCard;
