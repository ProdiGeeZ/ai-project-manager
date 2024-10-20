const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed-dev');

let testUserId;

beforeAll(() => {
    return seed()
        .then(() => {
            return db.query(`
                INSERT INTO users (email, password)
                VALUES ('testuser@example.com', 'password123')
                RETURNING id;
            `);
        })
        .then((result) => {
            testUserId = result.rows[0].id;
        });
});

afterAll(() => {
    return db.query(`DELETE FROM users WHERE email = 'testuser@example.com';`)
        .then(() => db.end());
});

describe('POST /projects', () => {
    test('201: Should create a new project for a user.', () => {
        return request(app)
            .post('/api/projects')
            .send({
                user_id: testUserId,
                name: 'Test Project',
                description: 'A test project description'
            })
            .expect(201)
            .then((res) => {
                expect(res.body.project).toHaveProperty('id');
                expect(res.body.project.name).toBe('Test Project');
                expect(res.body.project.description).toBe('A test project description');
                expect(res.body.project.user_id).toBe(testUserId);
            });
    });
    test('400: Should return an error if the request body is missing values.', () => {
        return request(app)
            .post('/api/projects')
            .send({
                name: 'Test Project',
                description: 'A test project description'
            })
            .expect(400)
        .then((res) => {
            expect(res.body.error).toBe('Bad Request');
        })
    });
    test('404: Should return an error if user_id does not exist.', () => {
        const nonExistentUserId = '550e8400-e29b-41d4-a716-446655440000';
        return request(app)
            .post('/api/projects')
            .send({
                user_id: nonExistentUserId,
                name: 'Test Project',
                description: 'A test project description'
            })
            .expect(404)
            .then((res) => {
                expect(res.body.error).toBe('User not found');
            });
    });
});
