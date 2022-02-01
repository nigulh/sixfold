const PriorityQueue = require('js-priority-queue');

export interface Hashable {
    getHash(): string;
}

export class PriorityQueueWithPath<T extends Hashable> {
    private queue: typeof PriorityQueue;
    private bestDistance: { [K in string]?: number } = {};
    private prevHash: { [K in string]?: string } = {};
    insertedCounter = 0;
    processedCounter = 0;
    private nodeMap: { [K in string]?: T } = {};

    constructor() {
        this.queue = new PriorityQueue({
            comparator: function ([a1, a2, a], [b1, b2, b]) {
                return (a || 0) - (b || 0);
            }
        });
    }

    insert(newNode: T, distance: number) {
        this.nodeMap[newNode.getHash()] = newNode;
        this.queue.queue([newNode.getHash(), this.queue.length == 0 ? undefined : this.getCurrent()?.getHash(), this.getCurrentDistance() + distance]);
        this.insertedCounter += 1;
    }

    getCurrent(): T {
        return <T>this.nodeMap[this.queue.peek()[0]];
    }

    getCurrentDistance(): number {
        if (this.queue.length == 0) {
            return 0;
        }
        return this.queue.peek()[2];
    }

    processCurrent(): boolean {
        let [curHash, prevHash, curDistance] = this.queue.dequeue();
        this.processedCounter += 1;
        this.bestDistance[curHash] = curDistance;
        this.prevHash[curHash] = prevHash;
        return this.isEmpty();
    }

    private isEmpty(): boolean {
        while (this.queue.length > 0) {
            let [curHash, prevHash, curDistance] = this.queue.peek();
            if ((this.bestDistance[curHash] ?? Infinity) > curDistance) {
                return false;
            }
            this.queue.dequeue();
        }
        return true;
    }

    getPathFromRootToCurrent(): Array<[T, T]> {
        let ret: Array<[T, T]> = [];
        let curNode = this.getCurrent();
        let prevNode = this.nodeMap[this.queue.peek()[1]];
        while (curNode !== undefined && prevNode !== undefined) {
            ret.push([prevNode, curNode]);
            curNode = prevNode;
            prevNode = this.nodeMap[this.prevHash[curNode.getHash()] ?? ""];
        }
        return ret.reverse();
    }

}
