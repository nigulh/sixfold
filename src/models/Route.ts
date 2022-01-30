/**
 * @swagger
 * components:
 *   schemas:
 *     route:
 *       properties:
 *         originIataCode:
 *           type: string
 *           example: TLL
 *         destinationIataCode:
 *           type: string
 *           example: HEL
 */

 export class Route {
    originIataCode: string
    destinationIataCode: string

    constructor(originIataCode: string, destinationIataCode: string) {
        this.originIataCode = originIataCode;
        this.destinationIataCode = destinationIataCode;
    }
}
