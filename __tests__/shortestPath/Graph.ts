import {Graph} from "../../src/shortestPath/Graph";

let graph = new Graph();

describe('Graph creation', () => {
    it('can add vertex and edge', () => {
        graph.addVertex("a");
        graph.addEdge("a", 1);
        expect(graph.adjacencyList).toEqual({"a": [1]});
    });
});
