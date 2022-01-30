/**
 * @swagger
 * components:
 *   schemas:
 *     shortestPathRequest:
 *       properties:
 *         originIataCode:
 *           type: string
 *           example: TLL
 *         destinationIataCode:
 *           type: string
 *           example: HEL
 */

export interface ShortestPathRequest {
    originIataCode: string
    destinationIataCode: string
}
