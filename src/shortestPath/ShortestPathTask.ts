import {Graph, Vertex} from "./Graph";
import {Metric} from "./Metric";

export interface ShortestPathTask {
    source: Vertex
    target: Vertex
    graph: Graph
    metric: Metric<Vertex>
}

export interface ShortestPath {
    findShortestPath(task: ShortestPathTask): [distance: number, path: Array<Vertex>]
}
