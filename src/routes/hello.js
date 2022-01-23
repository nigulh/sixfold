/**
 * @swagger
 * /ping/{message}:
 *   get:
 *     tags:
 *       - ping
 *     summary: Echo the path parameter
 *     description: For testing only
 *     parameters:
 *       - name: message
 *         in: path
 *         description: Message to echo
 *         required: true
 *     responses:
 *       200:
 *         description: Double echo response
 *         schema:
 *           $ref: '#/components/schemas/pingResponse'
 */

const {PingResponse} = require("../models/echo");
module.exports = function(app)
{
    app.get('/', (req, res) => {
        res.send('Hello World!!');
    });
    app.get('/ping/:message', (req, res) => {
        let message = req.params.message;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(new PingResponse(message)));
    });
}
