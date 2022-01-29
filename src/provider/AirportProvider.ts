import {getAllAirports} from '../Database'
import { parse } from 'csv-parse';
import {Airport} from "../models/Airport";

export class AirportProvider
{
    constructor() {
    }

    findAll() {
        return new Promise<Array<Airport>>((resolve, reject) => {
           getAllAirports().then((allAirports) => {
              resolve(this.parseCsv(allAirports).map(this.mapToAirport));
           });
        });
    }

    findById(id: string)
    {
        return new Promise<Airport>((resolve, reject) => {
            this.findAll().then(data => {
                let item = data.find(x => x.iataCode == id);
                if (item === undefined)
                {
                    reject("Could not find Airport " + id + "!");
                }
                else
                {
                    resolve(item);
                }
            });
        })
    }

    private parseCsv(allAirports: string) {
        const rows = [];
        const parser = parse({delimiter: ','});
        parser.on('readable', () => {
            let row;
            while ((row = parser.read()) !== null) {
                // @ts-ignore
                rows.push(row);
            }
        });
        parser.on('error', function(err){
            console.error(err.message);
        });
        parser.write(allAirports);
        parser.end();
        return rows;
    }

    private mapToAirport(data: any[]): Airport {
        return new Airport(data[4], data[1], data[2], data[3], parseFloat(data[6]), parseFloat(data[7]));
    }
}
