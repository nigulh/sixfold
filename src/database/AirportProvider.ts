import {getAllAirports} from '../Database'

export class AirportProvider
{
    constructor() {
    }

    findAll() {
        return getAllAirports();
    }

    findById(id: string)
    {
        return getAllAirports().find(x => x.iataCode == id);
    }
}
