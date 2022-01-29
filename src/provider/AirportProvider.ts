import {getAllAirports} from '../Database'
import {Airport} from "../models/Airport";

export class AirportProvider
{
    constructor() {
    }

    findAll() {
        let allAirports = getAllAirports();
        return allAirports.split("\n").map(this.convertCsvToAirport);
    }

    findById(id: string)
    {
        return this.findAll().find(x => x.iataCode == id);
    }

    private convertCsvToAirport(row) {
        let data = JSON.parse("[" + row + "]");
        return new Airport(data[4], data[1], data[2], data[3], data[6], data[7]);
    }
}
