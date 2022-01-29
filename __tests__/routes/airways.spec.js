const request = require('supertest')
const app = require('../../src/server')
const {Airport} = require("../../src/models/airport");
const Database = require("../../src/Database");

Database.setAllAirports('"A","B","C","D","E","F",12,13');
describe('Airways Endpoints', () => {
    it('should get all airports', async () => {
        const res = await request(app).get('/airports');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([ new Airport("E", "B", "C", "D", 12.0, 13.0)]);
    })
})
