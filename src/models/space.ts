class Node {
    z: number = 0
    v: number  = 0

    constructor(z: number, v: number) {
        this.z = z; 
        this.v = v;
    }
}

class Oscil {
    a: number = 0    
    t: number = 0
    x: number = 0
    
    constructor(x: number, a: number) {
        this.x = x;
        this.a = a;
    }
    
    zz(): Iterable<number> {
        const self = this;
        return {
            *[Symbol.iterator]() {
                self.t += 0.1;
                yield Math.sin(self.t) * self.a;
            }
        };
    }
}


export default class Space {
    k = 0
    m = 0
    time = 0
    nodes: Node[] = []
    oscils: Oscil[] = []


    constructor(n: number, k: number, m: number) {
        this.k = k;
        this.m = m;

        this.nodes = new Array(n);
        for (let i = 0; i < n; i++) {
            this.nodes[i] = new Node(0, 0);
        }
        
        // осцилятори
        this.oscils.push(new Oscil(500, 0.5));
    }

    step() {
        
        for (let i = 1; i < this.nodes.length - 1; i++) {
            let dz = this.nodes[i-1].z + this.nodes[i+1].z  - 2 * this.nodes[i].z;
            let a = this.k * dz / this.m;
            this.nodes[i].v += a;
        }
        for (let i = 1; i < this.nodes.length - 1; i++) {
            this.nodes[i].z += this.nodes[i].v;
        }

        // осцилятори
        let x: number = this.oscils[0].x;
        let iter = this.oscils[0].zz()[Symbol.iterator]();
        this.nodes[x].z = iter.next().value;;


        this.time++;
    }

}