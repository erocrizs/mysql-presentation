const details = {
    "player_count": 100,
    "hero_count": 55,

    "player_per_team": 3,
    "duration_range": {
        min: 30 * 1000,
        max: 12 * 60 * 1000
    },
    "timestamp_range": {
        min: new Date("2019-08-01").getTime(),
        max: new Date("2019-08-31").getTime()
    },

    "roles_count_range": {min: 1, max: 2},
    "roles": ['hitter', 'bruiser', 'tank', 'assassin', 'mage', 'support'],
    "countries": ['PH', 'JP', 'SG', 'US', 'CA', 'UK', 'SK', 'CN'],
    "teams": ['stratus', 'cirrus']
};

const days_released = 30;
const player_activity_rate = 0.25;
const avg_game_per_player_day = 1.5;

details.match_count = details.player_count
    * player_activity_rate
    * avg_game_per_player_day
    * days_released; 

module.exports = details;