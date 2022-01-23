const {Airport} = require("../models/airport");
const router = require('express').Router();

/**
 * @swagger
 * /airports:
 *   get:
 *     tags:
 *       - airways
 *     summary: List all airports
 *     responses:
 *       200:
 *         description: List of airports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/airport'
 */
router.get('/airports', (req, res) => {
    let airport = new Airport("A", "Aa", "B", "E", 20, 30);
    res.send([airport]);
});

module.exports = router;
