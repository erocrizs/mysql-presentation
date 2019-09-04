-- Number of active players per day per country

SELECT
    DATE(m.timestamp) date,
    p.country country,
    COUNT(DISTINCT p.id)
FROM players p
JOIN match_plays mp ON p.id = mp.player_id
JOIN matches m ON mp.match_id = m.id
WHERE m.timestamp >= '2019-08-25' and m.timestamp < '2019-09-01'
GROUP BY DATE(m.timestamp), p.country WITH ROLLUP;