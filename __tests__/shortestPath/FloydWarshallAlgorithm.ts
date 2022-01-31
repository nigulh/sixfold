import {ShortestPath} from "../../src/shortestPath/ShortestPathTask";
import {Graph, Vertex} from "../../src/shortestPath/Graph";
import {Metric} from "../../src/shortestPath/Metric";
import {ShortestPathRequest} from "../../src/models/ShortestPathRequest";

export class FloydWarshallAlgorithm implements ShortestPath {
    distances = {}

    constructor(distances: Graph, metrics: Metric<Vertex>) {
        for (let source of distances.getVertices()) {
            let fromSourceDistance = {};
            for (let target of distances.getVertices()) {
                fromSourceDistance[target] = Infinity;
            }
            for (let target of distances.getAdjacentFrom(source)) {
                fromSourceDistance[target] = metrics.findDistance(source, target);
            }
            distances[source] = fromSourceDistance;
        }
        for (let mid of distances.getVertices()) {
            for (let from of distances.getVertices()) {
                for (let to of distances.getVertices()) {
                    distances[from][to] = Math.min(distances[from][mid] + distances[mid][to], distances[from][to])
                }
            }
        }

        this.distances = distances;
    }

    findShortestPath(task: ShortestPathRequest): [distance: number, path: Array<Vertex>] {
        return [this.distances[task.originIataCode][task.destinationIataCode], []];
    }

}
