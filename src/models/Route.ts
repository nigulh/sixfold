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
 *         equipmentCodes:
 *           type: string
 */

 export class Route {
    originIataCode: string
    destinationIataCode: string
    equipmentCodes: string

    constructor(originIataCode: string, destinationIataCode: string, equipmentCodes: string) {
        this.originIataCode = originIataCode;
        this.destinationIataCode = destinationIataCode;
        this.equipmentCodes = equipmentCodes;
    }
}
