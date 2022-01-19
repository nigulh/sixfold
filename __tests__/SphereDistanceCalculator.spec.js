let SphereDistanceCalculator = require("../SphereDistanceCalculator").SphereDistanceCalculator;

describe('Sphere distance', () => {
    it('distance to self is zero', () => {
        expect(new SphereDistanceCalculator().findDistance(2, 3, 2, 3)).toBeCloseTo(0.0, 7);
    });
    it('distance to pole is half perimeter', () => {
        expect(new SphereDistanceCalculator().findDistance(2, 3, Math.PI+2, -3)).toBeCloseTo(Math.PI, 7);
    });
});