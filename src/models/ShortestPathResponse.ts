import {Vertex} from "../shortestPath/Graph";
import {Route} from "./Route";

/**
 * @swagger
 * components:
 *   schemas:
 *     shortestPathResponse:
 *       properties:
 *         distance:
 *           type: float
 *           example: 10.0
 *         deviation:
 *           description: extra distance relative to straight distance
 *           type: float
 *           example: 0.1
 *         steps:
 *           type: array
 *           example: [["TLL", "HEL"]]
 *           items:
 *             $ref: '#/components/schemas/route'
 */

export interface ShortestPathResponse {
    distance: number,
    deviation?: number,
    steps: Array<[Vertex, Vertex]|Route>,
}
