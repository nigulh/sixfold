/**
 * @swagger
 * components:
 *   schemas:
 *     airport:
 *       required:
 *         - iataCode
 *       properties:
 *         iataCode:
 *           type: string
 *           example: TLL
 *         name:
 *           type: string
 *           example: "Lennart Meri Tallinn Airport"
 *         city:
 *           type: string
 *           example: Tallinn
 *         country:
 *           type: string
 *           example: Estonia
 *         latitude:
 *           type: number
 *           example: 59.41329956049999
 *           summary: degrees, N positive, S negative
 *         longitude:
 *           type: number
 *           example: 24.832799911499997
 *           summary: degrees, E positive, W negative
 */
export class Airport {
    iataCode: string
    name: string
    city: string
    country: string
    latitude: number
    longitude: number

    constructor(iataCode: string, name: string, city: string, country: string, latitude: number, longitude: number) {
        this.iataCode = iataCode;
        this.city = city;
        this.country = country;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
