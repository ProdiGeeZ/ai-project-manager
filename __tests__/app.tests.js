const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');

beforeEach(() => {
    return seed();
});

afterAll(() => {
    db.end();
});

describe('', () => {
    test('', () => {
        
    });
});