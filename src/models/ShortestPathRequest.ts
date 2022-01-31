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
 *         numFlightsUpperBound:
 *           type: integer
 *           example: 3
 *           nullable: true
 */

export interface ShortestPathRequest {
    originIataCode: string
    destinationIataCode: string
    numFlightsUpperBound?: number
}
