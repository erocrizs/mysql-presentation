-- Heroes with best win rate per role

WITH hero_win_rate as (
	SELECT
		h.id hero_id,
		(SUM(IF(mp.team = m.winner, 1, 0)) * 100 / COUNT(*)) win_rate
    FROM heroes h
    JOIN match_plays mp
		ON mp.hero_id = h.id
	JOIN matches m
		ON m.id = mp.match_id
    GROUP BY h.id
),
role_best_rate as (
	SELECT
		hr.role_id,
		MAX(wr.win_rate) win_rate
	FROM hero_roles hr
	JOIN hero_win_rate wr ON wr.hero_id = hr.hero_id
	GROUP BY hr.role_id
)
SELECT
	r.name role,
	h.name best_hero,
    rbr.win_rate
FROM roles r
JOIN role_best_rate rbr ON rbr.role_id = r.id
JOIN hero_win_rate wr ON wr.win_rate = rbr.win_rate
JOIN heroes h ON h.id = wr.hero_id;