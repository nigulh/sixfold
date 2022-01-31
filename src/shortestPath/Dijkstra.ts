import {Graph, Vertex} from "./Graph";
import {ShortestPath} from "./ShortestPathTask";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "./Metric";

const PriorityQueue = require('js-priority-queue');

interface ShortestPathNode
{
    vertex: Vertex;
}

class ShortestPathState
{
    queue: typeof PriorityQueue;
    visited: { [K in Vertex]?: number } = {};
    prevNode: { [K in Vertex]?: Vertex } = {};
    insertedCounter = 0;
    processedCounter = 0;
    curVertex?: Vertex = undefined;
    curDistance = 0;

    constructor() {
        this.queue = new PriorityQueue({comparator: function([a1, a2, a], [b1, b2, b]) {
                return (a || 0) - (b || 0);
            }});
    }

    insert(newState: Vertex, distance: number) {
        this.queue.queue([newState, this.curVertex, this.curDistance + distance]);
        this.insertedCounter += 1;
    }

    retrieve() {
        while (this.queue.length > 0) {
            let [cur, prev, curDistance] = this.queue.dequeue();
            if (this.findMinimumDistanceSoFar(cur) <= curDistance) continue;
            this.processedCounter += 1;
            this.visited[cur] = curDistance;
            this.prevNode[cur] = prev;
            this.curVertex = cur;
            this.curDistance = curDistance;
            return cur;
        }
        return undefined;
    }

    private findMinimumDistanceSoFar(cur) {
        return this.visited[cur] ?? Infinity;
    }

    backtrackPath() {
        let ret: Array<Vertex> = [];
        let vertex = this.curVertex;
        while (vertex !== undefined)
        {
            ret.push(vertex);
            vertex = this.prevNode[vertex];
        }
        return ret.reverse();
    }

}

export class Dijkstra implements ShortestPath {
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
        while (curState = state.retrieve())
        {
            if (curState == task.destinationIataCode) {
                let ret = {distance: state.curDistance, path: state.backtrackPath()};
                console.log({inserted: state.insertedCounter, processed: state.processedCounter}, ret);
                return ret;
            }

            for (let next of this.graph.getAdjacentFrom(curState)) {
                state.insert(next, this.metric.findDistance(curState, next));
            }
        }
        return {distance: Infinity, path: []};
    }

}
