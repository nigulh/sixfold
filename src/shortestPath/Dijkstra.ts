import {Graph, Vertex} from "./Graph";
import {ShortestPath} from "./ShortestPathTask";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "./Metric";

const PriorityQueue = require('js-priority-queue');

interface ShortestPathNode
{
    vertex: Vertex,
    getHash: () => string,
}

class ShortestPathState
{
    queue: typeof PriorityQueue;
    visited: { [K in string]?: number } = {};
    prevNode: { [K in Vertex]?: string } = {};
    insertedCounter = 0;
    processedCounter = 0;
    curNode?: ShortestPathNode = undefined;
    curDistance = 0;
    nodeMap: { [K in string]?: ShortestPathNode } = {};

    constructor() {
        this.queue = new PriorityQueue({comparator: function([a1, a2, a], [b1, b2, b]) {
                return (a || 0) - (b || 0);
            }});
    }

    insert(newNode: ShortestPathNode, distance: number) {
        this.nodeMap[newNode.getHash()] = newNode;
        this.queue.queue([newNode.getHash(), this.curNode?.getHash(), this.curDistance + distance]);
        this.insertedCounter += 1;
    }

    retrieve(): ShortestPathNode | undefined {
        while (this.queue.length > 0) {
            let [curId, prevId, curDistance] = this.queue.dequeue();
            if (this.findMinimumDistanceSoFar(curId) <= curDistance) continue;
            this.processedCounter += 1;
            this.visited[curId] = curDistance;
            this.prevNode[curId] = prevId;
            this.curNode = this.nodeMap[curId];
            this.curDistance = curDistance;
            return this.curNode;
        }
        return undefined;
    }

    private findMinimumDistanceSoFar(cur) {
        return this.visited[cur] ?? Infinity;
    }

    backtrackPath() {
        let ret: Array<Vertex> = [];
        let curNode = this.curNode;
        while (curNode !== undefined)
        {
            ret.push(curNode.vertex);
            curNode = this.nodeMap[this.prevNode[curNode.getHash()] ?? ""];
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
        let curState: ShortestPathNode | undefined;

        state.insert(<ShortestPathNode>{vertex: task.originIataCode, getHash: () => { return task.originIataCode; }}, 0);
        while (curState = state.retrieve())
        {
            if (curState.vertex == task.destinationIataCode) {
                let ret = {distance: state.curDistance, path: state.backtrackPath()};
                console.log({inserted: state.insertedCounter, processed: state.processedCounter}, ret);
                return ret;
            }

            for (let next of this.graph.getAdjacentFrom(curState.vertex)) {
                state.insert(<ShortestPathNode>{vertex: next, getHash: () => { return next; }}, this.metric.findDistance(curState.vertex, next));
            }
        }
        return {distance: Infinity, path: []};
    }

}
