const mysql = require('anytv-node-mysql');
const bluebird = require('bluebird');
const squel = require('squel');
const _ = require('lodash');

mysql.add(
    'mysql_presentation_activity',
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysql_presentation_activity'
    }
);

function db (...query) {
    return mysql.use('mysql_presentation_activity')
        .build(...query)
        .promise();
}

const row_limit = 1000;

module.exports = db;

module.exports.insertRows = async function (rows, table) {
    await db(squel.delete().from(table));
    console.log(`done deleting all rows from table ${table}`);

    await bluebird.mapSeries(
        _.chunk(rows, row_limit),
        async (chunk, idx) => {
            const query = squel.insert().into(table).setFieldsRows(chunk);
            await db(query);
            console.log(`done inserting ${idx * row_limit + chunk.length} rows into ${table}`);
        }
    )
    console.log(`done inserting ALL data into ${table}`);
}