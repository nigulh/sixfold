import {getAllAirports} from '../Database'
import {Airport} from "../models/Airport";
//import { parse } from 'csv-parse/sync';
//const parse = require('csv-parse/sync').parse;

export class AirportProvider
{
    constructor() {
    }

    findAll() {
        let allAirports = getAllAirports();
        //let ret = parse(allAirports, {columns: false}).map(this.mapToAirport);
        let ret = [new Airport("E", "2", "3", "4", 5, 6)];
        return ret;
    }

    findById(id: string)
    {
        return this.findAll().find(x => x.iataCode == id);
    }

    private mapToAirport(data: any[]): Airport {
        return new Airport(data[4], data[1], data[2], data[3], parseFloat(data[6]), parseFloat(data[7]));
    }
}
