import {Graph, Vertex} from "./Graph";
import {ShortestPath} from "./ShortestPathTask";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "./Metric";

const PriorityQueue = require('js-priority-queue');

interface Hashable
{
    getHash(): string;
}

class DijkstraReal
{
    queue: typeof PriorityQueue;
    bestDistance: { [K in string]?: number } = {};
    prevNode: { [K in string]?: string } = {};
    insertedCounter = 0;
    processedCounter = 0;
    curNode?: Hashable = undefined;
    curDistance = 0;
    nodeMap: { [K in string]?: Hashable } = {};

    constructor() {
        this.queue = new PriorityQueue({comparator: function([a1, a2, a], [b1, b2, b]) {
                return (a || 0) - (b || 0);
            }});
    }

    insert(newNode: Hashable, distance: number) {
        this.nodeMap[newNode.getHash()] = newNode;
        this.queue.queue([newNode.getHash(), this.curNode?.getHash(), this.curDistance + distance]);
        this.insertedCounter += 1;
    }

    retrieve(): Hashable | undefined {
        while (this.queue.length > 0) {
            let [curId, prevId, curDistance] = this.queue.dequeue();
            let curNode = this.nodeMap[curId];
            if (curNode == undefined) throw new Error("Expected node to be in map");
            if (this.findMinimumDistanceSoFar(curNode) <= curDistance) continue;
            this.curNode = curNode;
            this.processedCounter += 1;
            this.bestDistance[curId] = curDistance;
            this.prevNode[curId] = prevId;
            this.curDistance = curDistance;
            return this.curNode;
        }
        return undefined;
    }

    private findMinimumDistanceSoFar(curNode: Hashable) {
        return this.bestDistance[curNode.getHash()] ?? Infinity;
    }

    backtrackPath(): Array<[Hashable, Hashable]> {
        let ret: Array<[Hashable, Hashable]> = [];
        let curNode = this.curNode;
        while (curNode !== undefined)
        {
            let prevNode = this.nodeMap[this.prevNode[curNode.getHash()] ?? ""];
            if (prevNode == undefined) break;
            ret.push([prevNode, curNode]);
            curNode = prevNode;
        }
        return ret.reverse();
    }

}

class ShortestPathNode implements Hashable
{
    vertex: Vertex;
    flightsRemaining: number;

    constructor(vertex: Vertex, flightsRemaining: number) {
        this.vertex = vertex;
        this.flightsRemaining = flightsRemaining;
    }

    getHash() {
        return <string>this.vertex + this.flightsRemaining;
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
        let state = new DijkstraReal();
        let curState: ShortestPathNode | undefined;
        let numFlights = task.numFlightsUpperBound ?? Infinity;

        state.insert(new ShortestPathNode(task.originIataCode, numFlights), this.metric.findDistance(task.originIataCode, task.destinationIataCode));
        while (curState = <ShortestPathNode | undefined>state.retrieve())
        {
            if (curState.vertex == task.destinationIataCode) {
                let ret = <ShortestPathResponse>{distance: state.curDistance, steps: state.backtrackPath().map(([x, y]) => [(<ShortestPathNode>x).vertex, (<ShortestPathNode>y).vertex])};
                console.log({inserted: state.insertedCounter, processed: state.processedCounter}, ret);
                return ret;
            }

            if (curState.flightsRemaining == 0) {
                continue;
            }

            for (let next of this.graph.getAdjacentFrom(curState.vertex)) {
                let extraDistance = this.metric.findDistance(curState.vertex, next) + this.metric.findDistance(next, task.destinationIataCode) - this.metric.findDistance(curState.vertex, task.destinationIataCode);
                state.insert(new ShortestPathNode(next, curState.flightsRemaining - 1), extraDistance);
            }
        }
        return {distance: Infinity, steps: []};
    }

}
