const PriorityQueue = require('js-priority-queue');

export interface Hashable {
    getHash(): string;
}

export class PriorityQueueWithPath<T extends Hashable> {
    private queue: typeof PriorityQueue;
    private bestDistance: { [K in string]?: number } = {};
    private prevNode: { [K in string]?: string } = {};
    insertedCounter = 0;
    processedCounter = 0;
    curNode?: T = undefined;
    curDistance = 0;
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
        this.queue.queue([newNode.getHash(), this.curNode?.getHash(), this.curDistance + distance]);
        this.insertedCounter += 1;
    }

    retrieve(): T | undefined {
        while (this.queue.length > 0) {
            let [curId, prevId, curDistance] = this.queue.dequeue();
            let curNode = this.nodeMap[curId];
            if (curNode == undefined) throw new Error("Expected node to be in map");
            if ((this.bestDistance[curNode.getHash()] ?? Infinity) <= curDistance) continue;
            this.curNode = curNode;
            this.processedCounter += 1;
            this.bestDistance[curId] = curDistance;
            this.prevNode[curId] = prevId;
            this.curDistance = curDistance;
            return this.curNode;
        }
        return undefined;
    }

    backtrackPath(): Array<[T, T]> {
        let ret: Array<[T, T]> = [];
        let curNode = this.curNode;
        while (curNode !== undefined) {
            let prevNode = this.nodeMap[this.prevNode[curNode.getHash()] ?? ""];
            if (prevNode == undefined) break;
            ret.push([prevNode, curNode]);
            curNode = prevNode;
        }
        return ret.reverse();
    }

}
