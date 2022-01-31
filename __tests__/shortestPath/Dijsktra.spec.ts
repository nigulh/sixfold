import {Graph, Vertex} from "../../src/shortestPath/Graph";
import {Dijkstra} from "../../src/shortestPath/Dijkstra";
import {Metric} from "../../src/shortestPath/Metric";
import {FloydWarshallAlgorithm} from "./FloydWarshallAlgorithm";


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
        return 1;
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
            let dijkstra = new Dijkstra(<Graph>graph, edgeCountMetric);
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
    let dijkstra = new Dijkstra(graph, edgeCountMetric);
    let bruteForce = new FloydWarshallAlgorithm(graph, edgeCountMetric)
    it("same values for all", () => {
       for(let source of graph.getVertices()) {
           for (let target of graph.getVertices()) {
               let problem = {originIataCode: source, destinationIataCode: target};

               let actual = dijkstra.findShortestPath(problem);
               let expected = bruteForce.findShortestPath(problem);
               expect(actual.distance).toEqual(expected.distance);
           }
       }
    });
})

