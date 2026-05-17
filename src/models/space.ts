class Node {
    x = 0
    v = 0
    loss = 0
}

export class Oscillator {
    ampl = 0    
    ph = 0
    i = 0
    dph = 0
    
    constructor(i: number, a: number, p: number = 20) {
        this.i = i;
        this.ampl = a;
        this.dph = 2 * Math.PI / p; 
        this.ph = -this.dph;
    }
    
    next_a() {
        this.ph += this.dph ;
        return Math.sin(this.ph) * this.ampl;
    }
}


export default class Space {
    k_m = 0  // = k/m
    time = 0  // такти часу
    loss = 0.0  // коеф. втрат
    nodes: Node[] = []
    oscillators: Oscillator[] = []


    constructor(n: number, k_m: number, loss: number) {
        this.k_m = k_m;
        this.loss = loss;
        // вузли
        this.nodes = new Array(n);
        for (let i = 0; i < n; i++) {
            this.nodes[i] = new Node();
        }
        // поглиначі
        const start = 500, len = 200, d = 0.1/len;
        for (let i = 0; i < len; i++) {
            this.nodes[start + i].loss = d * i;
        }
        

        // // осцилятори
        // this.oscillators.push(new Oscillator(1, 1));
    }

    step() {
        
        // швидкості
        for (let i = 1; i < this.nodes.length - 1; i++) {
            let dz = this.nodes[i-1].x + this.nodes[i+1].x  - 2 * this.nodes[i].x;
            let a = this.k_m * dz;
            this.nodes[i].v += a;
            // втрати
            this.nodes[i].v *= (1 - this.nodes[i].loss);
        }
        // амплітуди
        for (let i = 1; i < this.nodes.length - 1; i++) {
            this.nodes[i].x += this.nodes[i].v;
        }

        // осцилятори
        for (let o of this.oscillators) {
            this.nodes[o.i].x = o.next_a();
        }
    

        this.time++;
    }

}