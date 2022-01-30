import {getAllAirports} from '../Database'
import {Airport} from "../models/Airport";

export class AirportProvider {
    findAll() {
        return new Promise<Array<Airport>>((resolve, reject) => {
            getAllAirports()
                .then(allAirports => {
                    resolve(allAirports.map(this.mapToAirport));
                });
        });
    }

    findById(id: string) {
        return new Promise<Airport>((resolve, reject) => {
            this.findAll().then(data => {
                let item = data.find(x => x.iataCode == id);
                if (item === undefined) {
                    reject("Could not find Airport " + id + "!");
                } else {
                    resolve(item);
                }
            });
        })
    }

    private mapToAirport(data: string[]): Airport {
        return new Airport(data[4], data[1], data[2], data[3], parseFloat(data[6]), parseFloat(data[7]));
    }
}
