import {Graph, Vertex} from "../../src/shortestPath/Graph";
import {Dijkstra} from "../../src/shortestPath/Dijkstra";
import {ShortestPathRequest} from "../../src/models/ShortestPathRequest";
import {Metric} from "../../src/shortestPath/Metric";
import {FloydWarshallAlgorithm} from "./FloydWarshallAlgorithm";

let graph = new Graph();

let edges = {
    "1": "3",
    "3": "21",
    "2": "43"
}
let vertices = {
    "1": [1, 0],
    "2": [2, 0],
    "3": [3, 0],
    "4": [4, 0]
}
for(const source in edges)
{
    [...edges[source]].forEach(target => {
        graph.addEdge(source, target);
    })
}

let dijkstra = new Dijkstra(graph);

let bruteForce = new FloydWarshallAlgorithm(graph, <Metric<Vertex>> {
    findDistance(a: Vertex, b: Vertex): number {
        return 1;
    }
})

describe('Dijkstra', () => {
    it('simple dijkstra', () => {
        let problem = <ShortestPathRequest>{
            originIataCode: "1",
            destinationIataCode: "4",
        }
        let x = dijkstra.findShortestPath(problem);
        let y = bruteForce.findShortestPath(problem);
        expect(x).toEqual([3, ["1", "3", "2", "4"]]);
        expect(x).toEqual(y);
    });
    it ('no path', () => {
        let problem = <ShortestPathRequest>{
            originIataCode: "1",
            destinationIataCode: "5",
        }
        let x = dijkstra.findShortestPath(problem);
        let y = bruteForce.findShortestPath(problem);
        expect(x).toEqual([Infinity, []]);
        expect(x).toEqual(y);
    });
});
