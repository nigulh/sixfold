import {Graph, Vertex} from "../../src/shortestPath/Graph";
import {ShortestFlightRouteFinder} from "../../src/shortestPath/ShortestFlightRouteFinder";
import {Metric} from "../../src/utils/Metric";
import {FloydWarshallAlgorithm} from "./FloydWarshallAlgorithm";
import {ShortestPathRequest} from "../../src/models/ShortestPathRequest";


function buildGraph(edges) {
    let graph = new Graph();
    for (const source in edges) {
        [...edges[source]].forEach(target => {
            graph.addEdge(source, target);
        })
    }
    return graph;
}

let edgeCountMetric = <Metric<Vertex>> {
    findDistance(a: Vertex, b: Vertex): number {
        return a == b ? 0 : 1;
    }
};


describe('Dijkstra', () => {

    let cases = {
        'be in self': [{"1": "2"}, "1", "1", 0],
        'sample case': [{"1": "3", "3": "21", "2": "43"}, "1", "4", 3],
        'no path': [{"1": "2"}, "1", "5", Infinity],
        'flight to self': [{"1": "1"}, "1", "1", 0],
    };
    Object.entries(cases).forEach(([key, [edges, source, target, result]]) => {
        it(key, () => {
            let graph = buildGraph(edges);
            let problem = {originIataCode: <string>source, destinationIataCode: <string>target}
            let dijkstra = new ShortestFlightRouteFinder(<Graph>graph, edgeCountMetric);
            let bruteForce = new FloydWarshallAlgorithm(<Graph>graph, edgeCountMetric);

            let x = dijkstra.findShortestPath(problem);
            let y = bruteForce.findShortestPath(problem);
            expect(x).toEqual(y);
            expect(x.distance).toEqual(result);
        });
    });
});

describe("Dijkstra vs Flowyd", () => {
    let graph = buildGraph({
        "1": "234",
        "2": "256",
        "3": "15",
        "4": "5",
        "5": "62",
        "6": "1",
    });
    let dijkstra = new ShortestFlightRouteFinder(graph, edgeCountMetric);
    let bruteForce = new FloydWarshallAlgorithm(graph, edgeCountMetric)
    it("same values for all", () => {
       for(let source of graph.getVertices()) {
           for (let target of graph.getVertices()) {
               let problem = <ShortestPathRequest>{originIataCode: source, destinationIataCode: target};

               let actual = dijkstra.findShortestPath(problem);
               let expected = bruteForce.findShortestPath(problem);
               expect(actual.distance).toEqual(expected.distance);

               problem.numFlightsUpperBound = expected.steps.length;
               expect(dijkstra.findShortestPath(problem).distance).toEqual(expected.distance);
               problem.numFlightsUpperBound += 1;
               expect(dijkstra.findShortestPath(problem).distance).toEqual(expected.distance);
               problem.numFlightsUpperBound -= 2;
               if (problem.numFlightsUpperBound >= 0) {
                   actual = dijkstra.findShortestPath(problem);
                   expect(actual.distance).toBeGreaterThan(expected.distance);
               }
           }
       }
    });

    let equivalentGraph = new Graph();
    equivalentGraph.equivalencyList = graph.adjacencyList;
    let equivalentDijkstra = new ShortestFlightRouteFinder(equivalentGraph, edgeCountMetric);
    it("equivalency works", () => {
        for(let source of graph.getVertices()) {
            for (let target of graph.getVertices()) {
                let problem = <ShortestPathRequest>{originIataCode: source, destinationIataCode: target};

                let actual = dijkstra.findShortestPath(problem);
                let equivalentSolution = equivalentDijkstra.findShortestPath(problem);
                if (actual.distance <= 1) {
                    expect(equivalentSolution.distance).toEqual(actual.distance);
                } else {
                    expect(equivalentSolution.distance).toEqual(Infinity);
                }
            }
        }
    });
})

