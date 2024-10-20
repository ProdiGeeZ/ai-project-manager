const db = require('../connection');

let seed;

if (process.env.NODE_ENV === 'production') {
    seed = require('./seed-prod');
} else {
    seed = require('./seed-dev'); 
}

const runSeed = () => {
    return seed()
        .then(() => {
            console.log('Seeding complete, closing database connection...');
            return db.end();
        })
        .catch((err) => {
            console.error('Error seeding database:', err);
            return db.end(); 
        });
};

runSeed();
