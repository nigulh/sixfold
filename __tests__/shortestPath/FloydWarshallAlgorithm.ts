import {ShortestPath} from "../../src/shortestPath/ShortestPathTask";
import {Graph, Vertex} from "../../src/shortestPath/Graph";
import {Metric} from "../../src/shortestPath/Metric";
import {ShortestPathRequest} from "../../src/models/ShortestPathRequest";
import {ShortestPathResponse} from "../../src/models/ShortestPathResponse";

export class FloydWarshallAlgorithm implements ShortestPath {
    distances = {}
    prevs = {}

    constructor(adjancies: Graph, metric: Metric<Vertex>) {
        let distances = {};
        let prevs = {};
        for (let source of adjancies.getVertices()) {
            let fromSourceDistance = {};
            let fromSourcePrevs = {};
            for (let target of adjancies.getVertices()) {
                fromSourceDistance[target] = Infinity;
                fromSourcePrevs[target] = undefined;
            }
            for (let target of adjancies.getAdjacentFrom(source)) {
                fromSourceDistance[target] = metric.findDistance(source, target);
            }
            fromSourceDistance[source] = 0;
            distances[source] = fromSourceDistance;
            prevs[source] = fromSourcePrevs;
        }
        for (let mid of adjancies.getVertices()) {
            for (let from of adjancies.getVertices()) {
                for (let to of adjancies.getVertices()) {
                    let newDistance = distances[from][mid] + distances[mid][to];
                    if (newDistance < distances[from][to]) {
                        distances[from][to] = newDistance
                        prevs[from][to] = mid;
                    }
                }
            }
        }

        this.distances = distances;
        this.prevs = prevs;
    }

    findShortestPath(task: ShortestPathRequest): ShortestPathResponse {
        let distance = this.distances[task.originIataCode][task.destinationIataCode];
        if (distance == Infinity || distance == undefined)
        {
            return {distance: Infinity, steps: []}
        }
        return {distance: distance, steps: this.backtrackPath(task.originIataCode, task.destinationIataCode)};
    }

    private backtrackPath(from: Vertex, to: Vertex) {
        if (from == to) {
            return [];
        }
        let prev = this.prevs[from][to];
        if (prev == undefined) {
            return [[from, to]];
        }
        return this.backtrackPath(from, prev).concat(this.backtrackPath(prev, to));
    }
}
