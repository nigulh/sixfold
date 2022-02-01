import {SphereDistanceCalculator} from "../../src/utils/SphereDistanceCalculator";

describe('Sphere distance', () => {
    it('distance to self is zero', () => {
        expect(SphereDistanceCalculator.findDistance(3, 2, 3, 2)).toBeCloseTo(0.0, 7);
    });
    describe("distance to antipode is half perimeter", () => {
        let cases = {
            "origin": [2, 3],
            "random": [4, 5],
            "pole": [0, 90],
            "equator": [0, 0]
        };
        Object.entries(cases).forEach(([key, [N, E]]) => {
            it(key, () => {
                expect(SphereDistanceCalculator.findDistance(2, 3, N, E) + SphereDistanceCalculator.findDistance(N, E, -2, 183)).toBeCloseTo(Math.PI, 7);
            });
        });
    });
});
