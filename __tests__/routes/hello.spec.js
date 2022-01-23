const request = require('supertest')
const app = require('../../src/server')
describe('Hello Endpoints', () => {
    it('should get hello world', async () => {
        const res = await request(app).get('/ping/foo');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({echo: "foo!"});
    })
})
