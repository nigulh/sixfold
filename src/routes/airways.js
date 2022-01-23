const router = require('express').Router();
const {AirportProvider} = require("../database/AirportProvider");

let airportProvider = new AirportProvider();

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
    res.send(airportProvider.findAll());
});

/**
 * @swagger
 * /airports/{iataCode}:
 *   get:
 *     tags:
 *       - airways
 *     summary: Find airport by IATA code
 *     parameters:
 *       - name: iataCode
 *         in: path
 *         description: 3-letter IATA code
 *         required: true
 *     responses:
 *       200:
 *         description: Airport
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/airport'
 */
router.get('/airports/:iataCode', (req, res) => {
    let id = req.params.iataCode;
    res.send(airportProvider.findById(id));
});

module.exports = router;
