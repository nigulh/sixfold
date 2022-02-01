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
                try {
                    let airportMap = this.buildAirportsMap(myAirports);
                    let source = airportMap[data.originIataCode];
                    let target = airportMap[data.destinationIataCode];
                    if (source == undefined || target == undefined)
                    {
                        reject("Cannot find airport");
                    }
                    let measure = new AirportDistanceCalculator();
                    let metric = <Metric<Vertex>> {
                        findDistance(a: Vertex, b: Vertex): number {
                            return measure.findDistance(airportMap[a], airportMap[b]);
                        }
                    };
                    let graph = new Graph();
                    this.addRoutes(graph, myRoutes, airportMap);
                        if ((data.maxTransferDistance ?? 0) > 101) {
                            reject("maxTransferDistance too big");
                        }
                        if ((data.maxTransferDistance ?? 0) > 0) {
                            this.addTransfers(graph, myAirports, data.maxTransferDistance ?? 0, measure);
                        }
                    let ret = new ShortestFlightRouteFinder(graph, metric).findShortestPath(data);
                    if (ret.distance == Infinity)
                    {
                        reject("Could not find route");
                        return;
                    }
                    let optimalDistance = measure.findDistance(source, target);
                    ret.deviation = optimalDistance == 0 ? (ret.distance == 0 ? 0 : Infinity) : ret.distance / optimalDistance - 1;
                    resolve(ret);
                } catch (err) {
                    console.log("nb", err);
                    reject(err);
                    return;
                }
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

    private addRoutes(graph: Graph, myRoutes: Array<Route>, airportMap: {}) {
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

    private addTransfers(graph: Graph, myAirports: Array<Airport>, maxTransferDistance: number, measure: AirportDistanceCalculator) {
        let distanceInDegrees = 180 / Math.PI * maxTransferDistance / measure.radius;
        let buckets: {[K in number]: Array<Airport>} = {};
        let getBucketId = latitude => Math.floor(latitude);
        for (let airport of myAirports) {
            if (graph.adjacencyList[airport.iataCode] == undefined)
            {
                continue;
            }
            let bucketId = getBucketId(airport.latitude);
            buckets[bucketId] = (buckets[bucketId] ?? []);
            buckets[bucketId].push(airport);
        }
        for (let airport of myAirports) {
            if (graph.adjacencyList[airport.iataCode] == undefined)
            {
                continue;
            }
            let minLatitude = airport.latitude - distanceInDegrees;
            let maxLatitude = airport.latitude + distanceInDegrees;
            for (let b = getBucketId(minLatitude); b <= getBucketId(maxLatitude); b++) {
                for (let otherAirport of buckets[b] ?? []) {
                    let distance = measure.findDistance(airport, otherAirport);
                    if (distance <= maxTransferDistance && airport != otherAirport)
                    {
                        graph.addEquivalency(airport.iataCode, otherAirport.iataCode);
                    }
                }
            }
        }
        console.log("buckets done");
    }


}
