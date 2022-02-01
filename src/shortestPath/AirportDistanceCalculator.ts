import {Metric} from "./Metric";
import {Airport} from "../models/Airport";
import {SphereDistanceCalculator} from "../utils/SphereDistanceCalculator";

const EARTH_RADIUS_IN_KM = 6371;

export class AirportDistanceCalculator implements Metric<Airport> {

    radius: number = 1;

    constructor(radius: number = EARTH_RADIUS_IN_KM) {
        this.radius = radius;
    }

    findDistance(a: Airport, b: Airport) {
        return SphereDistanceCalculator.findDistance(a.latitude, a.longitude, b.latitude, b.longitude) * this.radius;
    }

}
