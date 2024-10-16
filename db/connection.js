const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
    throw new Error('PGDATABASE not set');
}

const config = {};

if (ENV === 'production') {
    config.connectionString = process.env.PGDATABASE; 
    config.ssl = { rejectUnauthorized: false };
    config.max = 10;
} else {
    config.connectionString = process.env.PGDATABASE; 
    config.max = ENV === 'test' ? 5 : 10; 
}

module.exports = new Pool(config);