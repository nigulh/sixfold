let SphereDistanceCalculator = require("../SphereDistanceCalculator").SphereDistanceCalculator;

describe('Sphere distance', () => {
    it('distance to self is zero', () => {
        expect(new SphereDistanceCalculator().findDistance(2, 3, 2, 3)).toEqual(0);
    });
});