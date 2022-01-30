import {ShortestPathRequest} from "../models/ShortestPathRequest";

const {AirportProvider} = require("../provider/AirportProvider");
const {RouteProvider} = require("../provider/RouteProvider");

let airportProvider = new AirportProvider();
let routeProvider = new RouteProvider();

export class ShortestPathHandler
{
    handle(body)
    {
        return new Promise((resolve, reject) => {
            console.log(body);
            let data = <ShortestPathRequest>body;
            let myAirports;
            let myRoutes;
            Promise.all([
                airportProvider.findAll().then(airports => myAirports = airports),
                routeProvider.findAll().then(routes => myRoutes = routes)
            ]).then(() => {
                resolve(myAirports.length + " " + myRoutes.length + " " + data.originIataCode);
            }).catch(e => reject(e))
        });
    }
}
