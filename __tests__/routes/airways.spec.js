const request = require('supertest')
const app = require('../../src/server')
const {Airport} = require("../../src/models/airport");
const Database = require("../../src/Database");

Database.setAllAirports('"A","B","C","D","E","F",12,13');
describe('Airways Endpoints', () => {
    it('should get all airports', async () => {
        const res = await request(app).get('/airports');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(JSON.parse('[{"iataCode":"E","city":"C","country":"D","name":"B","latitude":12,"longitude":13}]'));
    })
})
