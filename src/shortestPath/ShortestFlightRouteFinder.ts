import {Graph, Vertex} from "./Graph";
import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";
import {Metric} from "../utils/Metric";
import {ShortestPathFinder} from "./ShortestPathFinder";
import {Hashable, PriorityQueueWithPath} from "../utils/PriorityQueueWithPath";

class AirportNode implements Hashable
{
    vertex: Vertex;
    flightsRemaining: number;
    isTransferAvailable: boolean;

    constructor(vertex: Vertex, flightsRemaining: number, isTransferAvailable: boolean) {
        this.vertex = vertex;
        this.flightsRemaining = flightsRemaining;
        this.isTransferAvailable = isTransferAvailable;
    }

    getHash() {
        return <string>this.vertex + this.flightsRemaining + this.isTransferAvailable;
    }
}

export class ShortestFlightRouteFinder implements ShortestPathFinder {
    private graph: Graph
    private metric: Metric<Vertex>;

    constructor(graph: Graph, metric: Metric<Vertex>) {
        this.graph = graph;
        this.metric = metric;
    }

    findShortestPath(task: ShortestPathRequest): ShortestPathResponse {
        let state = new PriorityQueueWithPath<AirportNode>();
        let numFlights = task.maxNumFlights ?? Infinity;
        let curState: AirportNode | undefined = new AirportNode(task.originIataCode, numFlights, true);

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
                let extraDistance = this.findExtraDistance(curState.vertex, next, task.destinationIataCode);
                state.insert(new AirportNode(next, curState.flightsRemaining - 1, true), extraDistance);
            }

            if (curState.isTransferAvailable) {
                for (let next of this.graph.getEquivalentFrom(curState.vertex))
                {
                    let extraDistance = this.findExtraDistance(curState.vertex, next, task.destinationIataCode);
                    state.insert(new AirportNode(next, curState.flightsRemaining, false), extraDistance);
                }
            }

        } while (!state.processCurrent())
        return {distance: Infinity, steps: []};
    }

    private findExtraDistance(from: Vertex, next: Vertex, to: string) {
        return this.metric.findDistance(from, next) + this.metric.findDistance(next, to) - this.metric.findDistance(from, to);
    }
}
