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
        let prevNode: { [K in Vertex]?: Vertex } = {}

        queue.queue([source, undefined, 0]);
        visited[source] = 0;
        while(queue.length > 0)
        {
            let [cur, prev, curDistance] = queue.dequeue();
            if ((visited[cur] ?? Infinity) < curDistance) continue;
            console.log([cur, curDistance])
            visited[cur] = curDistance;
            prevNode[cur] = prev;
            if (cur == target) return [curDistance, this.backtrackPath(target, prevNode)];

            for (let next of graph.getAdjacentFrom(cur))
            {
                queue.queue([next, cur, curDistance + 1]);
            }
        }
        return [Infinity, []];
    }

    private backtrackPath(target: Vertex, prevNode: { [K in Vertex]?: Vertex }) {
        let ret: Array<Vertex> = [];
        while (true)
        {
            ret.push(target);
            let newTarget = prevNode[target];
            if (newTarget === undefined) {
                break;
            }
            else {
                target = newTarget;
            }
        }
        return ret.reverse();
    }
}
