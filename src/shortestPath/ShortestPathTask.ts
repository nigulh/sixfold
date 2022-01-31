import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";

export interface ShortestPath {
    findShortestPath(task: ShortestPathRequest): ShortestPathResponse
}
