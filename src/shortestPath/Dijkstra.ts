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
        let numFlights = task.numFlightsUpperBound ?? Infinity;
        let curState: AirportNode | undefined = new AirportNode(task.originIataCode, numFlights);

        state.insert(curState, this.metric.findDistance(task.originIataCode, task.destinationIataCode));
        do
        {
            curState = state.getCurrent();
            if (curState.vertex == task.destinationIataCode) {
                let ret = <ShortestPathResponse>{distance: state.getCurrentDistance(), steps: state.getPathFromRootToCurrent().map(([x, y]) => [x.vertex, y.vertex])};
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

        } while (!state.processCurrent())
        return {distance: Infinity, steps: []};
    }

}
