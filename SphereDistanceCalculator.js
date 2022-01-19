"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});



class SphereDistanceCalculator {
    findDistance(x1, y1, x2, y2) {
        let d = Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2-x1));
        return d;
    }
}

exports.SphereDistanceCalculator = SphereDistanceCalculator;
