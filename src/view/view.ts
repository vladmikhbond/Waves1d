import Space from "../models/space.js";

const canvas = (document.getElementById("canvas") as HTMLCanvasElement)!;
const time = (document.getElementById("time") as HTMLSpanElement)!;




export function show(space: Space, n_vis: number ) {
    const ctx = canvas.getContext("2d")!;
    const n = space.nodes.length

    const kx = canvas.width / n_vis
    const ky = 300;
    const b = canvas.height / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // grid
    ctx.beginPath();
    ctx.strokeStyle = "gray";        
    for (let x = 0; x < canvas.width; x += 100) {
       ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); 
    }
    ctx.stroke(); 

    // vawes
    ctx.beginPath();
    ctx.strokeStyle = "red"
    ctx.moveTo(0, -space.nodes[0].z * ky + b);
    for (let i = (n - n_vis) / 2 ; i < (n + n_vis) / 2; i++) {
        let node = space.nodes[i]
        let x = (i - (n - n_vis) / 2) * kx
        let y = -node.z * ky + b
        
        // x, y
        ctx.lineTo(x, y);
        ctx.strokeRect(x, y, 1, 1);

    }
    ctx.stroke();
    time.innerHTML = space.time.toString()
}
