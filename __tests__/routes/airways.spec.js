const request = require('supertest')
const app = require('../../dist/server')
const {Airport} = require("../../dist/models/airport");
const Database = require("../../dist/Database");

Database.setAllAirports('"A","B","C","D","E","F","G","H"');
describe('Airways Endpoints', () => {
    it('should get all airports', async () => {
        const res = await request(app).get('/airports');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([ new Airport("E", "B", "C", "D", "G", "H")]);
    })
})
