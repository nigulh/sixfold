import {Vertex} from "../shortestPath/Graph";

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
 *           example: ["TLL", "HEL"]
 *           items:
 *             type: string
 */

export interface ShortestPathResponse {
    distance: number,
    path: Array<[Vertex, Vertex]>,
}
