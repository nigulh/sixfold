import {Graph, Vertex} from "./Graph";
import {ShortestPath} from "./ShortestPathTask";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "./Metric";

const PriorityQueue = require('js-priority-queue');

class ShortestPathState
{
    queue: typeof PriorityQueue;
    visited: { [K in Vertex]?: number } = {};
    prevNode: { [K in Vertex]?: Vertex } = {};
    insertedCounter = 0;
    processedCounter = 0;
    curVertex = undefined;

    constructor() {
        this.queue = new PriorityQueue({comparator: function([a1, a2, a], [b1, b2, b]) {
                return (a || 0) - (b || 0);
            }});
    }

    insert(newState: Vertex, distance: number) {
        this.queue.queue([newState, this.curVertex, distance]);
        this.insertedCounter += 1;
    }

    retrieve() {
        while (this.queue.length > 0) {
            let [cur, prev, curDistance] = this.queue.dequeue();
            if ((this.visited[cur] ?? Infinity) <= curDistance) continue;
            console.log("expanding from node: " + [cur, curDistance]);
            this.processedCounter += 1;
            this.visited[cur] = curDistance;
            this.prevNode[cur] = prev;
            this.curVertex = cur;
            return [cur, curDistance];
        }
        return undefined;
    }

    backtrackPath(target: Vertex) {
        let ret: Array<Vertex> = [];
        while (true)
        {
            ret.push(target);
            let newTarget = this.prevNode[target];
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

export class Dijkstra implements ShortestPath{
    private graph: Graph
    private metric: Metric<Vertex>;

    constructor(graph: Graph, metric: Metric<Vertex>) {
        this.graph = graph;
        this.metric = metric;
    }

    findShortestPath(task: ShortestPathRequest): ShortestPathResponse {
        let state = new ShortestPathState();
        let curState;

        state.insert(task.originIataCode, 0);
        while(curState = state.retrieve())
        {
            let [cur, curDistance] = curState;

            if (cur == task.destinationIataCode) {
                console.log({inserted: state.insertedCounter, processed: state.processedCounter});
                return {distance: curDistance, path: state.backtrackPath(cur)};
            }

            for (let next of this.graph.getAdjacentFrom(cur)) {
                state.insert(next, curDistance + this.metric.findDistance(cur, next));
            }
        }
        return {distance: Infinity, path: []};
    }

}
