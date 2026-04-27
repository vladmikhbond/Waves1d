import Space from "../models/space";

const canvas = (document.getElementById("canvas") as HTMLCanvasElement)!;
const time = (document.getElementById("time") as HTMLSpanElement)!;




export function show(space: Space, n_vis: number ) {
    const ctx = canvas.getContext("2d")!;
    const n = space.nodes.length

    const kx = canvas.width / n_vis
    const ky = 300;
    const b = canvas.height / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // coords
    ctx.beginPath();
    ctx.strokeStyle = "gray"
    ctx.moveTo(0, b); ctx.lineTo(canvas.width, b);    // Ox
    // ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);  // Oy
    ctx.stroke();
    // vawes
    ctx.beginPath();
    ctx.strokeStyle = "red"
    // ctx.moveTo(0, -space.nodes[0].z * ky + b);
    for (let i = (n - n_vis) / 2 ; i < (n + n_vis) / 2; i++) {
        let node = space.nodes[i]
        let x = (i - (n - n_vis) / 2) * kx
        let y = -node.z * ky + b
        let w = node.m * node.v * node.v / 2;
        let u =  node.m * node.z * node.z / 2;
        let e = w + u;
        
        if (node.z > 0) {
            console.log(i, w, u, e)
        }

        // ctx.lineTo(x, y);
        // ctx.strokeRect(x, y, 1, 1);
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(x, -e * ky + canvas.height);
        

    }
    ctx.stroke();
    time.innerHTML = space.time.toString()
}
