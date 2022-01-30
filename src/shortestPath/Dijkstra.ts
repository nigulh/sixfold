import {Graph, Vertex} from "./Graph";
const PriorityQueue = require('js-priority-queue');

export class Dijkstra {

    findShortestPath(graph: Graph, source: Vertex, target: Vertex) {
        let queue = new PriorityQueue();
        let visited: { [K in Vertex]?: number } = {}

        queue.queue([source, 0]);
        while(queue.length > 0)
        {
            let [cur, curDistance] = queue.dequeue();
            if (cur == target) return curDistance;
            if (visited[cur] ?? Infinity < curDistance) continue;
            visited[cur] = curDistance;
            for (var next of graph.getAdjacentFrom(cur))
            {
                queue.queue([next, curDistance + 1]);
            }
        }
        return Infinity;
    }
}
