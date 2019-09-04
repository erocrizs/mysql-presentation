const db = require('./db');
const details = require('./details');

const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');

async function fill_matches () {
    const rows = _.times(
        details.match_count,
        idx => ({
            id: (idx + 1),
            duration: faker.random.number(details.duration_range),
            winner: faker.random.arrayElement(details.teams),
            timestamp: moment.utc(faker.random.number(details.timestamp_range))
                .format('YYYY-MM-DD HH:mm:ss')
        })
    );
    
    await db.insertRows(rows, 'matches');
}

async function fill_match_plays () {
    const matches_rows = _.times(
        details.match_count,
        match_idx => {
            const total_player_count = details.player_per_team * 2;

            const players = {};
            while (_.size(players) < total_player_count) {
                const id = faker.random.number({
                    min: 1,
                    max: details.player_count
                });

                players[id] = {};
            }

            const heroes = {};
            while (_.size(heroes) < total_player_count) {
                const id = faker.random.number({
                    min: 1,
                    max: details.hero_count
                });

                heroes[id] = {};
            }

            const player_hero_map = _.keys(heroes);

            return _.map(
                _.keys(players),
                (player_id, play_idx) => ({
                    player_id,
                    match_id: (match_idx + 1),
                    team: details.teams[play_idx % 2],
                    hero_id: player_hero_map[play_idx]
                })
            );
        },
    );

    const rows = _.flatten(matches_rows);
    
    await db.insertRows(rows, 'match_plays');
}

async function run () {
    console.log('Starting filling matches');
    await fill_matches();
    await fill_match_plays();
    console.log('Finished filling matches');
}

run().catch(err => console.error(err.message))
    .then(() => process.exit(0))