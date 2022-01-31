import {Graph, Vertex} from "./Graph";
import {ShortestPath} from "./ShortestPathTask";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "./Metric";

const PriorityQueue = require('js-priority-queue');

export class Dijkstra implements ShortestPath{
    private graph: Graph
    private metric: Metric<Vertex>;

    constructor(graph: Graph, metric: Metric<Vertex>) {
        this.graph = graph;
        this.metric = metric;
    }

    findShortestPath(task: ShortestPathRequest): ShortestPathResponse {
        let queue = new PriorityQueue({comparator: function([a1, a2, a], [b1, b2, b]) {
            return (a || 0) - (b || 0);
        }});
        let visited: { [K in Vertex]?: number } = {}
        let prevNode: { [K in Vertex]?: Vertex } = {}

        queue.queue([task.originIataCode, undefined, 0]);
        let insertedCounter = 0, processedCounter = 0;
        while(queue.length > 0)
        {
            let [cur, prev, curDistance] = queue.dequeue();
            if ((visited[cur] ?? Infinity) < curDistance) continue;
            console.log("expanding from node: " + [cur, curDistance]);
            processedCounter += 1;
            visited[cur] = curDistance;
            prevNode[cur] = prev;
            if (cur == task.destinationIataCode) {
                console.log({inserted: insertedCounter, processed: processedCounter});
                return {distance: curDistance, path: this.backtrackPath(cur, prevNode)};
            }

            for (let next of this.graph.getAdjacentFrom(cur))
            {
                queue.queue([next, cur, curDistance + this.metric.findDistance(cur, next)]);
                insertedCounter += 1;
            }
        }
        return {distance: Infinity, path: []};
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
