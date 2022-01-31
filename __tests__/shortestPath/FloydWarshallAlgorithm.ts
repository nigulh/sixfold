import {ShortestPath} from "../../src/shortestPath/ShortestPathTask";
import {Graph, Vertex} from "../../src/shortestPath/Graph";
import {Metric} from "../../src/shortestPath/Metric";
import {ShortestPathRequest} from "../../src/models/ShortestPathRequest";
import {ShortestPathResponse} from "../../src/models/ShortestPathResponse";

export class FloydWarshallAlgorithm implements ShortestPath {
    distances = {}
    prevs = {}

    constructor(adjancies: Graph, metrics: Metric<Vertex>) {
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
                fromSourceDistance[target] = metrics.findDistance(source, target);
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
            return {distance: Infinity, path: []}
        }
        return {distance: distance, path: this.backtrackPath(task.originIataCode, task.destinationIataCode).concat(task.destinationIataCode)};
    }

    private backtrackPath(from: Vertex, to: Vertex) {
        if (to == undefined) {
            return [from];
        }
        if (from == undefined || from == to) {
            return [];
        }
        let prev = this.prevs[from][to];
        return this.backtrackPath(from, prev).concat(this.backtrackPath(prev, to));
    }
}
