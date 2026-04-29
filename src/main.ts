import Space from "./models/space.js";
import { show } from "./view/view.js";

const n = 1000;      // total area
const n_vis = 200;  // visible middle area
const mid = n / 2 | 0, beg = ( n - n_vis) / 2 | 0, end = beg + n_vis;

let k: number;
let m: number;
let period: number;
let space: Space;
let timer: ReturnType<typeof setInterval> | 0;

function readParams() {
    k = +(document.getElementById("k") as HTMLInputElement)!.value;
    m = +(document.getElementById("m") as HTMLInputElement)!.value;
    period = +(document.getElementById("p") as HTMLInputElement)!.value;
    space = new Space(n, k, m);
    stop();
    // config
    space.nodes[mid].z =  1;
    // const count = 8
    // for (let i = 0; i < count; i++) {
    //     space.nodes[mid + i].z = space.nodes[mid - i].z = Math.cos(Math.PI * i/(2*count));
    // }

}
readParams();

// show params
document.getElementById("params")!.innerHTML = `${n}/${n_vis}`

// =========================== controller ===============================

document.getElementById("initButton")!.addEventListener("click", () => {
    readParams();
    show(space, n_vis);
});

document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key == "!") {
        if (timer) stop(); else run();
    } else if (e.key == "1") {
        stop();
        space.step();
        show(space, n_vis);
    }
});

function stop() {
    if (timer) {
        clearInterval(timer);
        timer = 0;
    }
}

function run() {
    if (timer) return;
    timer = setInterval(() => {
        space.step();
        show(space, n_vis);
        if (space.nodes[1].z > 0) {
            stop(); 
        }
    }, period);
}