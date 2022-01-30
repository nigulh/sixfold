

export type Vertex = keyof any;

export class Graph {
    adjacencyList: {
        [K in Vertex]?: Vertex[]
    } = {}

    ensureVertex(value: Vertex) {
        this.adjacencyList[value] = this.adjacencyList[value] ?? [];
    }

    addEdge(vertex1: Vertex, vertex2: Vertex) {
        this.ensureVertex(vertex1);
        this.ensureVertex(vertex2);
        this.adjacencyList[vertex1]?.push(vertex2)
    }

    getVertices() {
        return Object.keys(this.adjacencyList);
    }

    getAdjacentFrom(vertex: Vertex): Array<Vertex> {
        return this.adjacencyList[vertex] ?? [];
    }
}

