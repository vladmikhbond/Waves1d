import Space from "../models/space";

export function show(space: Space, canvas: HTMLCanvasElement, gap: number ) {
    const ctx = canvas.getContext("2d")!;
    const n = space.nodes.length

    const kx = canvas.width / gap
    const ky = 10;
    const b = canvas.height / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // coords
    ctx.beginPath();
    ctx.strokeStyle = "gray"
    ctx.moveTo(0, b); ctx.lineTo(canvas.width, b);
    ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    // vawes
    ctx.beginPath();
    ctx.strokeStyle = "red"
    ctx.moveTo(0, -space.nodes[0].z * ky + b);
    for (let i = (n - gap) / 2 ; i < (n + gap) / 2; i++) {
        let x = (i - (n - gap) / 2) * kx
        let y = -space.nodes[i].z * ky + b
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeText(space.time.toString(), 10, 10);
    
}