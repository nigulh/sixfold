

export type Vertex = keyof any;

export class Graph {
    adjacencyList: {
        [K in Vertex]?: Vertex[]
    } = {}

    equivalencyList: {
        [K in Vertex]?: Vertex[]
    } = {}

    ensureVertex(value: Vertex) {
        this.adjacencyList[value] = this.adjacencyList[value] ?? [];
    }

    getVertices() {
        return Object.keys(this.adjacencyList);
    }

    addEdge(vertex1: Vertex, vertex2: Vertex) {
        this.ensureVertex(vertex1);
        this.ensureVertex(vertex2);
        this.adjacencyList[vertex1]?.push(vertex2)
    }

    getAdjacentFrom(vertex: Vertex): Array<Vertex> {
        return this.adjacencyList[vertex] ?? [];
    }

    addEquivalency(vertex1: Vertex, vertex2: Vertex) {
        this.ensureVertex(vertex1);
        this.ensureVertex(vertex2);
        this.equivalencyList[vertex1]?.push(vertex2)
    }

    getEquivalentFrom(vertex: Vertex): Array<Vertex> {
        return this.equivalencyList[vertex] ?? [];
    }

}

