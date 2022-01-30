const router = require('express').Router();
const {ShortestPathHandler} = require("./ShortestPathHandler");

/**
 * @swagger
 * /shortestPath:
 *   post:
 *     description: Find shortest path between airports
 *     tags:
 *       - airways
 *     requestBody:
 *       description: Shortest path request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/shortestPathRequest'
 *     responses:
 *       200:
 *         description: Route
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/route'
 */
router.post('/shortestPath', (req, res, next) => {
    new ShortestPathHandler().handle(req.body).then(response => {
        res.send(response)
    }).catch(e => next(e));
});

module.exports = router;
