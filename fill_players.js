const db = require('./db');
const details = require('./details');

const _ = require('lodash');
const faker = require('faker');

async function run () {
    console.log('Starting filling players');

    const rows = _.times(
        details.player_count,
        idx => ({
            id: (idx + 1),
            name: faker.internet.userName(),
            email: faker.internet.email(),
            country: faker.random.arrayElement(details.countries)
        })
    );
    
    await db.insertRows(rows, 'players');

    console.log('Finished filling players');
}

run().catch(err => console.error(err))
    .then(() => process.exit(0))