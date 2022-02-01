import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {Graph, Vertex} from "../shortestPath/Graph";
import {Airport} from "../models/Airport";
import {Route} from "../models/Route";
import {ShortestFlightRouteFinder} from "../shortestPath/ShortestFlightRouteFinder";
import {Metric} from "../utils/Metric";
import {SphereDistanceCalculator} from "../utils/SphereDistanceCalculator";
import {AirportDistanceCalculator} from "../shortestPath/AirportDistanceCalculator";

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
                let airportMap = this.buildAirportsMap(myAirports);
                let graph = this.buildGraph(myRoutes, airportMap);
                let measure = new AirportDistanceCalculator();
                let metric = <Metric<Vertex>> {
                    findDistance(a: Vertex, b: Vertex): number {
                        return measure.findDistance(airportMap[a], airportMap[b]);
                    }
                };
                let ret = new ShortestFlightRouteFinder(graph, metric).findShortestPath(data);
                if (ret.distance == Infinity)
                {
                    reject("Could not find route");
                    return;
                }
                let optimalDistance = measure.findDistance(airportMap[data.originIataCode], airportMap[data.destinationIataCode]);
                ret.deviation = optimalDistance == 0 ? (ret.distance == 0 ? 0 : Infinity) : ret.distance / optimalDistance - 1;
                resolve(ret);
            }).catch(e => reject(e))
        });
    }

    private buildAirportsMap(myAirports: Array<Airport>) {
        let airportMap = {};
        for (let airport of myAirports) {
            airportMap[airport.iataCode] = airport;
        }
        return airportMap;
    }

    private buildGraph(myRoutes: Array<Route>, airportMap: {}) {
        let graph = new Graph()
        let skipCount = 0;
        for (let route of myRoutes) {
            if (airportMap[route.originIataCode] === undefined || airportMap[route.destinationIataCode] === undefined) {
                skipCount++;
                continue;
            }
            graph.addEdge(route.originIataCode, route.destinationIataCode);
        }
        console.log("Skipped", skipCount, "routes");
        return graph;
    }
}
