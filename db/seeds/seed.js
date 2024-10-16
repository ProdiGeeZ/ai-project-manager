const db = require('../connection');

const seed = () => {
    return db
        .query(`DROP TABLE IF EXISTS comments;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS articles;`);
        })
};

module.exports = seed;