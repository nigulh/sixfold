const router = require('express').Router();
const {AirportProvider} = require("../provider/AirportProvider");
const {RouteProvider} = require("../provider/RouteProvider");

let airportProvider = new AirportProvider();
let routeProvider = new RouteProvider();

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
    airportProvider.findAll().then((x) => res.send(x))
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
 *         example: HEL
 *     responses:
 *       200:
 *         description: Airport
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/airport'
 */
router.get('/airports/:iataCode', (req, res, next) => {
    let id = req.params.iataCode;
    airportProvider.findById(id).then(x => res.send(x)).catch(e => next(e))
});

/**
 * @swagger
 * /routes/{origin}/{destination}:
 *   get:
 *     tags:
 *       - airways
 *     summary: Find route by IATA code
 *     parameters:
 *       - name: origin
 *         in: path
 *         description: 3-letter IATA code
 *         required: true
 *         example: TLL
 *       - name: destination
 *         in: path
 *         description: 3-letter IATA code
 *         required: true
 *         example: HEL
 *     responses:
 *       200:
 *         description: Route
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/route'
 */
router.get('/routes/:origin/:destination', (req, res, next) => {
    let origin = req.params.origin;
    let destination = req.params.destination;
    routeProvider.findById(origin, destination).then(x => res.send(x)).catch(e => next(e))
});

module.exports = router;
