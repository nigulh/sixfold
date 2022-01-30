import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {Graph} from "../shortestPath/Graph";
import {Airport} from "../models/Airport";
import {Route} from "../models/Route";
import {Dijkstra} from "../shortestPath/Dijkstra";
import {ShortestPathTask} from "../shortestPath/ShortestPathTask";

const {AirportProvider} = require("../provider/AirportProvider");
const {RouteProvider} = require("../provider/RouteProvider");

let airportProvider = new AirportProvider();
let routeProvider = new RouteProvider();

export class ShortestPathHandler
{
    handle(body)
    {
        return new Promise((resolve, reject) => {
            let data = <ShortestPathRequest>body;
            let myAirports: Array<Airport>;
            let myRoutes: Array<Route>;
            Promise.all([
                airportProvider.findAll().then(airports => myAirports = airports),
                routeProvider.findAll().then(routes => myRoutes = routes)
            ]).then(() => {
                let g = new Graph()
                for(let route of myRoutes)
                {
                    g.addEdge(route.originIataCode, route.destinationIataCode);
                }
                let task = <ShortestPathTask> {
                    source: data.originIataCode,
                    target: data.destinationIataCode,
                    graph: g,
                };
                let ret = new Dijkstra().findShortestPath(task)
                resolve(ret);
            }).catch(e => reject(e))
        });
    }
}
