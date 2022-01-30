import {Graph} from "../../src/shortestPath/Graph";
import {Dijkstra} from "../../src/shortestPath/Dijkstra";
import {ShortestPathTask} from "../../src/shortestPath/ShortestPathTask";

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
let eucledian = {
    findDistance(a: string, b: string)
    {
        let s = vertices[a], t = vertices[b]
        let dx = s[0] - t[0], dy = s[1] - t[1]
        return Math.sqrt(dx**2 + dy**2)
    }
}
describe('Dijkstra', () => {
    it('simple dijkstra', () => {
        let dijkstra = new Dijkstra();
        let problem = <ShortestPathTask>{
            graph: graph,
            source: "1",
            target: "4",
        }
        let x = dijkstra.findShortestPath(problem);
        expect(x).toEqual([3, ["1", "3", "2", "4"]]);
    });
    it ('no path', () => {
        let dijkstra = new Dijkstra();
        let problem = <ShortestPathTask>{
            graph: graph,
            source: "1",
            target: "5",
        }
        let x = dijkstra.findShortestPath(problem);
        expect(x).toEqual([Infinity, []]);
    });
});
