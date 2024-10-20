const db = require('../connection');

const seedDev = () => {
    return db.query(`DROP TABLE IF EXISTS projects;`)
        .then(() => db.query(`DROP TABLE IF EXISTS users;`))
        .then(() => db.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `))
        .then(() => db.query(`
            CREATE TABLE projects (
                id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `))
        .then(() => db.query(`
            INSERT INTO users (email, password)
            VALUES 
            ('user1@example.com', 'password1'),
            ('user2@example.com', 'password2');
        `))
        .then(() => {
            console.log('local database seeded successfully');
        })
        .catch((error) => {
            console.error('Error seeding local database:', error);
        });
};

module.exports = seedDev;