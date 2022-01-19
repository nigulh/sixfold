SphereDistanceCalculator = require("../src/SphereDistanceCalculator");

describe('Sphere distance', () => {
    it('distance to self is zero', () => {
        expect(new SphereDistanceCalculator().findDistance(3, 2, 3, 2)).toBeCloseTo(0.0, 7);
    });
    it('distance to pole is half perimeter', () => {
        expect(new SphereDistanceCalculator().findDistance(3, 2, -3, 180 + 2)).toBeCloseTo(Math.PI, 7);
    });
});