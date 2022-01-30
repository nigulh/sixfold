import {Vertex} from "./Graph";
import {ShortestPath, ShortestPathTask} from "./ShortestPathTask";

const PriorityQueue = require('js-priority-queue');

export class Dijkstra implements ShortestPath{

    findShortestPath(task: ShortestPathTask): [distance: number, path: Array<Vertex>] {
        let queue = new PriorityQueue({comparator: function([a1, a2, a], [b1, b2, b]) {
            return (a || 0) - (b || 0);
        }});
        let visited: { [K in Vertex]?: number } = {}
        let prevNode: { [K in Vertex]?: Vertex } = {}

        queue.queue([task.source, undefined, 0]);
        let insertedCounter = 0, processedCounter = 0;
        while(queue.length > 0)
        {
            let [cur, prev, curDistance] = queue.dequeue();
            if ((visited[cur] ?? Infinity) < curDistance) continue;
            console.log("expanding from node: " + [cur, curDistance]);
            processedCounter += 1;
            visited[cur] = curDistance;
            prevNode[cur] = prev;
            if (cur == task.target) {
                console.log({inserted: insertedCounter, processed: processedCounter});
                return [curDistance, this.backtrackPath(cur, prevNode)];
            }

            for (let next of task.graph.getAdjacentFrom(cur))
            {
                queue.queue([next, cur, curDistance + 1]);
                insertedCounter += 1;
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
