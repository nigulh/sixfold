SphereDistanceCalculator = require("../src/SphereDistanceCalculator");

let calculator = new SphereDistanceCalculator();

describe('Sphere distance', () => {
    it('distance to self is zero', () => {
        expect(calculator.findDistance(3, 2, 3, 2)).toBeCloseTo(0.0, 7);
    });
    describe("distance to antipode is half perimeter", () => {
        Object.entries({
            "origin": [2, 3],
            "random": [4, 5],
            "pole": [0, 90],
            "equator": [0, 0]
        }).forEach(([key, [N, E]]) => {
            it(key, () => {
                expect(calculator.findDistance(2, 3, N, E) + calculator.findDistance(N, E, -2, 183)).toBeCloseTo(Math.PI, 7);
            });
        });
    });
});