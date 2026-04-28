class Node {
    z: number = 0
    v: number  = 0

    constructor(z: number, v: number) {
        this.z = z; 
        this.v = v;
    }
}

export default class Space {
    k = 0
    m = 0
    time = 0
    nodes: Node[] = []

    constructor(n: number, k: number, m: number) {
        this.k = k;
        this.m = m;

        this.nodes = new Array(n);
        for (let i = 0; i < n; i++) {
            this.nodes[i] = new Node(0, 0);
        }
    }

    step() {
        for (let i = 1; i < this.nodes.length - 1; i++) {
            let f = this.nodes[i-1].z + this.nodes[i+1].z  - 2 * this.nodes[i].z;
            let a = this.k * f / this.m;
            this.nodes[i].v += a;
        }
        for (let i = 1; i < this.nodes.length - 1; i++) {
            this.nodes[i].z += this.nodes[i].v;
        }
        this.time++;
    }
}