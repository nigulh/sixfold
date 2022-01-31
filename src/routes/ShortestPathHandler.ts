import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {Graph, Vertex} from "../shortestPath/Graph";
import {Airport} from "../models/Airport";
import {Route} from "../models/Route";
import {Dijkstra} from "../shortestPath/Dijkstra";
import {Metric} from "../shortestPath/Metric";
import {SphereDistanceCalculator} from "../SphereDistanceCalculator";

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
                let graph = new Graph()
                let airportMap = {};
                for (let airport of myAirports)
                {
                    airportMap[airport.iataCode] = airport;
                }
                let measure = new SphereDistanceCalculator();
                let skipCount = 0;
                for (let route of myRoutes)
                {
                    if (airportMap[route.originIataCode] === undefined || airportMap[route.destinationIataCode] === undefined)
                    {
                        skipCount++;
                        continue;
                    }
                    graph.addEdge(route.originIataCode, route.destinationIataCode);
                }
                console.log("Skipped", skipCount, "routes");
                let metric = <Metric<Vertex>> {
                    findDistance(a: Vertex, b: Vertex): number {
                        return measure.findDistance(airportMap[a], airportMap[b]);
                    }
                };
                let ret = new Dijkstra(graph, metric).findShortestPath(data);
                resolve(ret);
            }).catch(e => reject(e))
        });
    }
}
