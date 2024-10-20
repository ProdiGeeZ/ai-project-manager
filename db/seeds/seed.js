const db = require('../connection');

const seed = () => {
    return db
        .query(`DROP TABLE IF EXISTS task_history;`)
        .then(() => db.query(`DROP TABLE IF EXISTS tickets;`))
        .then(() => db.query(`DROP TABLE IF EXISTS projects;`))
        .then(() => {
            return db.query(`
                CREATE TABLE projects (
                    id SERIAL PRIMARY KEY,
                    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                );
            `);
        })
        .then(() => {
            return db.query(`
                CREATE TABLE tickets (
                    id SERIAL PRIMARY KEY,
                    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    type VARCHAR(50) NOT NULL,
                    status VARCHAR(50) DEFAULT 'To Do',
                    priority VARCHAR(50) DEFAULT 'Medium',
                    data JSONB,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW(),
                    due_date TIMESTAMP,
                    completed_at TIMESTAMP
                );
            `);
        })
        .catch(err => {
            console.error('Error seeding database:', err);
        });
};

module.exports = seed;