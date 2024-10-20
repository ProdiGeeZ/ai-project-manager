const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (ENV === "production" && !process.env.DATABASE_URL) {
    throw new Error("Environment variable DATABASE_URL is required in production environment");
}

const poolConfig = {};

if (ENV === "production") {
    poolConfig.connectionString = process.env.DATABASE_URL;
    poolConfig.ssl = {
        rejectUnauthorized: false,
    };
    poolConfig.max = 20;
} else {
    poolConfig.database = process.env.PGDATABASE;
}


module.exports = new Pool(poolConfig);
