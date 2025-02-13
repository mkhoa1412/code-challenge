const dotenv = require('dotenv');

dotenv.config();

// console.log(path.resolve('./src/config'));

// const { env } = require('./src/config');

module.exports = {
    dev: {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    },
    test: {
        dialect: 'postgres',
        host: 'localhost',
        port: 6789,
        database: 'pg_test',
        username: 'pg_test_user',
        password: 'pg_test_password',
    },
    prod: {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    },
}