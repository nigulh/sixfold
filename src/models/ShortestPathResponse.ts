import {Vertex} from "../shortestPath/Graph";
import {Route} from "./Route";

/**
 * @swagger
 * components:
 *   schemas:
 *     shortestPathResponse:
 *       properties:
 *         distance:
 *           summary: distance in kilometers
 *           type: float
 *           example: 10.0
 *         deviation:
 *           summary: extra distance relative to geodesic straight distance.
 *           description: 0 - optimal distance, 0.1 - 10% extra
 *           type: float
 *           example: 0.1
 *         steps:
 *           summary: Not complete yet
 *           type: array
 *           example: [["TLL", "HEL"]]
 *           items:
 *             $ref: '#/components/schemas/route'
 */

export interface ShortestPathResponse {
    distance: number,
    deviation?: number,
    steps: Array<[Vertex, Vertex, string]|Route>,
}
