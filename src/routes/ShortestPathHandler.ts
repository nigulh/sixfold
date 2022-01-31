import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {Graph, Vertex} from "../shortestPath/Graph";
import {Airport} from "../models/Airport";
import {Route} from "../models/Route";
import {Dijkstra} from "../shortestPath/Dijkstra";
import {Metric} from "../shortestPath/Metric";

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
                for(let route of myRoutes)
                {
                    graph.addEdge(route.originIataCode, route.destinationIataCode);
                }
                let metric = <Metric<Vertex>> {
                    findDistance(a: Vertex, b: Vertex): number {
                        return 1;
                    }
                };
                let ret = new Dijkstra(graph, metric).findShortestPath(data)
                resolve(ret);
            }).catch(e => reject(e))
        });
    }
}
