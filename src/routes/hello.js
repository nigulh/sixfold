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
 *         description: Echo response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pingResponse'
 */

const {PingResponse} = require("../models/Echo");
const router = require('express').Router();

//module.exports = function()
{
    router.get('/', (req, res) => {
        res.send('Hello World!!');
    });
    router.get('/ping/:message', (req, res) => {
        let message = req.params.message;
        res.send(new PingResponse(message));
    });
}

module.exports = router;
