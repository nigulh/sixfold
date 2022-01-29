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

router.get('/', (req, res) => {
    res.send('Hello World!!');
});
router.get('/ping/:message', (req, res, next) => {
    let message = req.params.message;
    findResponse(message).then((response) => {
        res.send(response);
    }).catch(e => {
        next(e);
    });
});

function findResponse(message)
{
    return new Promise((resolve, reject) => {
       if (message === "!")
       {
           reject("No exclamations, pls!")
       }
       else
       {
           resolve(new PingResponse(message));
       }
    });
}

module.exports = router;
