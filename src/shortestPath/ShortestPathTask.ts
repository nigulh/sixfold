import {Graph, Vertex} from "./Graph";
import {Metric} from "./Metric";
import {ShortestPathRequest} from "../models/ShortestPathRequest";

export interface ShortestPath {
    findShortestPath(task: ShortestPathRequest): [distance: number, path: Array<Vertex>]
}
