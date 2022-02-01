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
 *         maxNumFlights:
 *           summary: if empty, then no upper bound
 *           type: integer
 *           example: 3
 *           nullable: true
 *         maxTransferDistance:
 *           summary: if empty or zero, then no transfers allowed
 *           type: integer
 *           example: 50
 *           nullable: true
 */

export interface ShortestPathRequest {
    originIataCode: string
    destinationIataCode: string
    maxNumFlights?: number
    maxTransferDistance?: number
}
