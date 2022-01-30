export type Vertex = keyof any;

export class Graph {
    adjacencyList: {
        [K in Vertex]?: Vertex[]
    } = {}

    addVertex(value: Vertex) {
        if (!this.adjacencyList[value]) this.adjacencyList[value] = []
    }

    addEdge(vertex1: Vertex, vertex2: Vertex) {
        this.adjacencyList[vertex1]?.push(vertex2)
    }
}

