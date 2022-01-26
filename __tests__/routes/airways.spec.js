const request = require('supertest')
const app = require('../../dist/server')
const {Airport} = require("../../dist/models/airport");
//const Database = require("../../dist/Database");

//Database.mockAllAirports("A,B,C,D,E,F,G,H");
describe('Airways Endpoints', () => {
    it('should get all airports', async () => {
        const res = await request(app).get('/airports');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([ new Airport("A4", "X", "C")]);
    })
})
