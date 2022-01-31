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
 *         path:
 *           type: array
 *           example: [["TLL", "HEL"]]
 *           items:
 *             $ref: '#/components/schemas/route'
 */

export interface ShortestPathResponse {
    distance: number,
    steps: Array<[Vertex, Vertex]|Route>,
}
