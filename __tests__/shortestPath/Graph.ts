import {Graph} from "../../src/shortestPath/Graph";
let graph = new Graph();

describe('Graph creation', () => {
    it('can add vertex and edge', () => {
        graph.addEdge("a", "1");
        expect(graph.getAdjacentFrom("a")).toEqual(["1"]);
        expect(graph.getAdjacentFrom("x")).toEqual([]);
        expect(graph.getVertices()).toEqual(["1", "a"]);
    });
});
