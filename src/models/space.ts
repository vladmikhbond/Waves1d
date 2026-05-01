class Node {
    z: number = 0
    v: number  = 0

    constructor(z: number, v: number) {
        this.z = z; 
        this.v = v;
    }
}

class Oscillator {
    a = 0    
    t = 0
    x = 0
    dt = 0.1
    
    constructor(x: number, a: number) {
        this.x = x;
        this.a = a;
    }
    
    next_z() {
        this.t += this.dt ;
        return Math.sin(this.t) * this.a;
    }
}


export default class Space {
    k = 0  // жорсткость
    m = 0  // маса
    time = 0  // такти часу
    loss = 0.99  // коеф. втрат
    nodes: Node[] = []
    oscillators: Oscillator[] = []


    constructor(n: number, k: number, m: number, l: number) {
        this.k = k;
        this.m = m;
        this.loss = l;

        this.nodes = new Array(n);
        for (let i = 0; i < n; i++) {
            this.nodes[i] = new Node(0, 0);
        }
        
        // осцилятори
        this.oscillators.push(new Oscillator(450, 1));
        this.oscillators.push(new Oscillator(451, 1));
        this.oscillators.push(new Oscillator(452, 1));
        this.oscillators.push(new Oscillator(453, 1));
        this.oscillators.push(new Oscillator(454, 1));
    }

    step() {
        
        // швидкості
        for (let i = 1; i < this.nodes.length - 1; i++) {
            let dz = this.nodes[i-1].z + this.nodes[i+1].z  - 2 * this.nodes[i].z;
            let a = (this.k / this.m) * dz;
            this.nodes[i].v += a;
            this.nodes[i].v *= this.loss;
        }
        // амплітуди
        for (let i = 1; i < this.nodes.length - 1; i++) {
            this.nodes[i].z += this.nodes[i].v;
        }

        // осцилятори
        for (let o of this.oscillators) {
            this.nodes[o.x].z = o.next_z();
        }
    

        this.time++;
    }

}