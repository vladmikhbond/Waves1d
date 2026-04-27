class Node {
    z: number = 0
    m: number = 10
    v: number  = 0

}

export default class Space {
    k = 0.5
    time = 0
    nodes: Node[] = []

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            let node = new Node();
            this.nodes.push(node);
        }
    }

    step() {
        for (let i = 1; i < this.nodes.length - 1; i++) {
            let dz = this.nodes[i-1].z + this.nodes[i+1].z  - 2 * this.nodes[i].z;
            let a = this.k * dz / this.nodes[i].m;
            this.nodes[i].v += a;
        }
        for (let i = 1; i < this.nodes.length - 1; i++) {
            this.nodes[i].z += this.nodes[i].v;
        }
        this.time++;
    }
}