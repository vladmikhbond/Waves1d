import Space from "./models/space.js";
import { show } from "./view/view.js";

let k = +(document.getElementById("k") as HTMLInputElement).value;
let m = +(document.getElementById("m") as HTMLInputElement).value;
let period = +(document.getElementById("p") as HTMLInputElement).value;

const n = 1000;      // total area
const n_vis = 200;  // visible middle area
const mid = n / 2 | 0, beg = ( n - n_vis) / 2 | 0, end = beg + n_vis;

// show params
document.getElementById("params")!.innerHTML = `${n}/${n_vis} k=${k}   m=${m}   period=${period} msec`

// init state
let space = new Space(n, k, m);
space.nodes[mid].z = 1
let timer: ReturnType<typeof setInterval> | 0 = 0;

// =========================== controller ===============================

document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key == "Enter") {
        if (timer) stop(); else run();
    } else if (e.key == " ") {
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