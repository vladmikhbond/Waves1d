class Node {
    z = 0
    v = 0
    l = 0
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
    k = 0  // жорсткість
    m = 0  // маса
    time = 0  // такти часу
    loss = 0.0  // коеф. втрат
    nodes: Node[] = []
    oscillators: Oscillator[] = []


    constructor(n: number, k: number, m: number, l: number) {
        this.k = k;
        this.m = m;
        this.loss = l;
        // вузли
        this.nodes = new Array(n);
        for (let i = 0; i < n; i++) {
            this.nodes[i] = new Node();
        }
        // поглиначі
        const start = 500, len = 200, d = 0.1/len;
        for (let i = 0; i < len; i++) {
            this.nodes[start + i].l = d * i;
        }
        

        // осцилятори
        this.oscillators.push(new Oscillator(1, 1));
    }

    step() {
        
        // швидкості
        for (let i = 1; i < this.nodes.length - 1; i++) {
            let dz = this.nodes[i-1].z + this.nodes[i+1].z  - 2 * this.nodes[i].z;
            let a = (this.k / this.m) * dz;
            this.nodes[i].v += a;
            // втрати
            this.nodes[i].v *= (1 - this.nodes[i].l);
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