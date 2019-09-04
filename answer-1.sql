-- Heroes with less than 45% win rate

SELECT
	h.*, 
    COUNT(*) plays,
    SUM(IF(m.winner = mp.team, 1, 0)) wins
FROM heroes h
JOIN match_plays mp ON mp.hero_id = h.id
JOIN matches m ON m.id = mp.match_id
GROUP BY h.id
HAVING wins / plays < 0.45;