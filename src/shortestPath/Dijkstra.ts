import {Vertex} from "./Graph";
import {ShortestPath, ShortestPathTask} from "./ShortestPathTask";
const PriorityQueue = require('js-priority-queue');

export class Dijkstra implements ShortestPath{
    findShortestPath(task: ShortestPathTask): [distance: number, path: Array<Vertex>] {
        let graph = task.graph
        let source = task.source;
        let target = task.target;
        let queue = new PriorityQueue();
        let visited: { [K in Vertex]?: number } = {}

        queue.queue([source, 0]);
        while(queue.length > 0)
        {
            let [cur, curDistance] = queue.dequeue();
            if (cur == target) return [curDistance, []];
            if (visited[cur] ?? Infinity < curDistance) continue;
            visited[cur] = curDistance;
            for (let next of graph.getAdjacentFrom(cur))
            {
                queue.queue([next, curDistance + 1]);
            }
        }
        return [Infinity, []];
    }
}
