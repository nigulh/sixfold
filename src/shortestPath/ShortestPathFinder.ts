import {ShortestPathRequest} from "../models/ShortestPathRequest";
import {ShortestPathResponse} from "../models/ShortestPathResponse";

export interface ShortestPathFinder {
    findShortestPath(task: ShortestPathRequest): ShortestPathResponse
}
