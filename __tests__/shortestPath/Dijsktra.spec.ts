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

let graph = buildGraph({
    "1": "3",
    "3": "21",
    "2": "43"
});

let dijkstra = new Dijkstra(graph);
let bruteForce = new FloydWarshallAlgorithm(graph, <Metric<Vertex>> {
    findDistance(a: Vertex, b: Vertex): number {
        return 1;
    }
})

describe('Dijkstra', () => {
    it('simple dijkstra', () => {
        let problem = {originIataCode: "1", destinationIataCode: "4",}
        let solution = {distance: 3, path: ["1", "3", "2", "4"]};
        let x = dijkstra.findShortestPath(problem);
        let y = bruteForce.findShortestPath(problem);
        expect(x).toEqual(solution);
        expect(x).toEqual(y);
    });
    it ('no path', () => {
        let problem = {originIataCode: "1", destinationIataCode: "5",}
        let solution = {distance: Infinity, path: []};
        let x = dijkstra.findShortestPath(problem);
        let y = bruteForce.findShortestPath(problem);
        expect(x).toEqual(solution);
        expect(x).toEqual(y);
    });
    let cases = {
        'another case': ["1", "4"],
        'no path': ["1", "5"]
    };
    Object.entries(cases).forEach(([key, [source, target]]) => {
        it(key, () => {
            let problem = {originIataCode: <string>source, destinationIataCode: <string>target}
            let x = dijkstra.findShortestPath(problem);
            let y = bruteForce.findShortestPath(problem);
            expect(x).toEqual(y);
        });
    });

});

