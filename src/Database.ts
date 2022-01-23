import {Airport} from "./models/airport";

export function getAllAirports() {
    let airport = new Airport("A", "Aaaa", "B", "E", 20, 30);
    return [airport];
}
export function getAll() {
    return [];
}

