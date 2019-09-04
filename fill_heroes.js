const db = require('./db');
const details = require('./details');

const _ = require('lodash');
const faker = require('faker');

async function fill_hero () {
    const rows = _.times(
        details.hero_count,
        idx => ({
            id: (idx + 1),
            name: _.startCase(
                faker.name.firstName()
                + ' the'
                + faker.random.arrayElement([
                    ' ' + faker.commerce.productMaterial(),
                    ' ' + faker.commerce.productAdjective(),
                    ' ' + faker.commerce.product(),
                    ' ' + faker.commerce.color(),
                    ' ' + faker.company.catchPhraseAdjective(),
                    ' ' + faker.company.catchPhraseDescriptor(),
                    ' ' + faker.company.bsAdjective(),
                    ' ' + faker.company.bsBuzz(),
                    ' ' + faker.hacker.adjective(),
                    ' ' + faker.hacker.ingverb(),
                    ' ' + faker.name.jobDescriptor(),
                    ''
                ])
                + ' ' + faker.name.jobType()
            )
        })
    );
    
    await db.insertRows(rows, 'heroes');
}

async function fill_roles () {
    const table_name = 'hero_roles';

    const role_rows = _.times(
        details.hero_count,
        idx => {
            const role_count = faker.random.number(details.roles_count_range);

            const roles = _.uniqBy(
                _.times(
                    role_count,
                    () => ({
                        hero_id: (idx + 1),
                        role: faker.random.arrayElement(details.roles)
                    })
                ),
                'role'
            );

            return roles;
        }
    );

    const rows = _.flatten(role_rows);

    await db.insertRows(rows, 'hero_roles');
}

async function run () {
    console.log('Starting filling heroes');
    await fill_hero();
    await fill_roles();
    console.log('Finished filling heroes');
}

run().catch(err => console.error(err))
    .then(() => process.exit(0))