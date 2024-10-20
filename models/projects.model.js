const db = require('../db/connection')

exports.createNewProject = (user_id, name, description) => {
    if (!user_id || !name || !description) {
        return Promise.reject({message: 'Bad Request'})
    }
    return db.query('SELECT * FROM users WHERE id = $1', [user_id])
        .then((result) => {
            if (result.rows.length === 0) {
                throw new Error('User not found');
            }

            return db.query(
                'SELECT * FROM projects WHERE user_id = $1 AND name = $2',
                [user_id, name]
            );
        })
        .then((result) => {
            if (result.rows.length > 0) {
                throw new Error('Project already exists');
            }
            return db.query(
                `INSERT INTO projects (user_id, name, description, created_at, updated_at)
                 VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`,
                [user_id, name, description]
            );
        })
        .then((result) => {
            return result.rows[0]; 
        });
};