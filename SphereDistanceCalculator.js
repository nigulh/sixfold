"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});



class SphereDistanceCalculator {
    findDistance(n1, e1, n2, e2) {
        let N1 = n1 * Math.PI / 180;
        let E1 = e1 * Math.PI / 180;
        let N2 = n2 * Math.PI / 180;
        let E2 = e2 * Math.PI / 180;
        let d = Math.acos(Math.sin(N1) * Math.sin(N2) + Math.cos(N1) * Math.cos(N2) * Math.cos(E2 - E1));
        return d;
    }
}

exports.SphereDistanceCalculator = SphereDistanceCalculator;
