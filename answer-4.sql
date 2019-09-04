-- Daily report of how many wins for cirrus and stratus

WITH RECURSIVE dates AS (
	SELECT '2019-08-01' as date
    UNION ALL
    SELECT (date + INTERVAL 1 DAY) as date
    FROM dates
    WHERE date < '2019-08-31'
)
SELECT
	d.date,
    m.winner,
    COUNT(*)
FROM dates d
JOIN matches m
	ON d.date <= m.timestamp
	AND m.timestamp < (d.date + INTERVAL 1 DAY)
GROUP BY date, winner WITH ROLLUP;