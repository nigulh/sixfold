import {Airport} from "./models/Airport";
import {Metric} from "./shortestPath/Metric";

export class SphereDistanceCalculator implements Metric<Airport> {
    radius: number = 1;

    constructor(radius: number = 1) {
        this.radius = radius;
    }

    _findDistance(n1: number, e1: number, n2: number, e2: number) {
        let N1 = n1 * Math.PI / 180;
        let E1 = e1 * Math.PI / 180;
        let N2 = n2 * Math.PI / 180;
        let E2 = e2 * Math.PI / 180;
        let arcCos = Math.sin(N1) * Math.sin(N2) + Math.cos(N1) * Math.cos(N2) * Math.cos(E2 - E1);
        let d = Math.acos(Math.max(-1, Math.min(1, arcCos)));
        if (isNaN(d)) {
            console.log("???", arcCos, d, n1, e1, n2, e2);
        }
        return d;
    }

    findDistance(a: Airport, b: Airport) {
        return this._findDistance(a.latitude, a.longitude, b.latitude, b.longitude) * this.radius;
    }
}
