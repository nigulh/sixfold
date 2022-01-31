import {Graph, Vertex} from "./Graph";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "./Metric";
import {ShortestPath} from "./ShortestPathTask";
import {Hashable, PriorityQueueWithPath} from "./PriorityQueueWithPath";

class AirportNode implements Hashable
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
        let state = new PriorityQueueWithPath<AirportNode>();
        let curState: AirportNode | undefined;
        let numFlights = task.numFlightsUpperBound ?? Infinity;

        state.insert(new AirportNode(task.originIataCode, numFlights), this.metric.findDistance(task.originIataCode, task.destinationIataCode));
        while (curState = <AirportNode | undefined>state.retrieve())
        {
            if (curState.vertex == task.destinationIataCode) {
                let ret = <ShortestPathResponse>{distance: state.curDistance, steps: state.backtrackPath().map(([x, y]) => [(<AirportNode>x).vertex, (<AirportNode>y).vertex])};
                console.log({inserted: state.insertedCounter, processed: state.processedCounter}, ret);
                return ret;
            }

            if (curState.flightsRemaining == 0) {
                continue;
            }

            for (let next of this.graph.getAdjacentFrom(curState.vertex)) {
                let extraDistance = this.metric.findDistance(curState.vertex, next) + this.metric.findDistance(next, task.destinationIataCode) - this.metric.findDistance(curState.vertex, task.destinationIataCode);
                state.insert(new AirportNode(next, curState.flightsRemaining - 1), extraDistance);
            }
        }
        return {distance: Infinity, steps: []};
    }

}
