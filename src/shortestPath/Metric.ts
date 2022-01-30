export interface Metric<T> {
    findDistance(a: T, b: T): number;
}
