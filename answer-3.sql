-- MOVING AVERAGE

SELECT
    m.timestamp,
    mp.team,
    m.winner,
    ((SUM(IF(m.winner = mp.team, 1, 0))  OVER chronological_updates) / (COUNT(*) OVER chronological_updates)) as win_rate
FROM match_plays mp
JOIN matches m ON m.id = mp.match_id
WHERE mp.player_id = 17
WINDOW chronological_updates as (ORDER BY m.timestamp ROWS UNBOUNDED PRECEDING)
ORDER BY m.timestamp;