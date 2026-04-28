import Space from "./models/space.js";
import { show } from "./view/view.js";

const k = 0.5
const m = 100;
const n = 1000;      // total area
const n_vis = 200;  // visible middle area
const period = 50    // perod in msec

const params = (document.getElementById("params") as HTMLSpanElement)!;
params.innerHTML = `${n}/${n_vis}`

const mid = n / 2 | 0, beg = ( n - n_vis) / 2 | 0, end = beg + n_vis;

let space = new Space(n, k, m);

// init state
space.nodes[mid].z = 1
let timer: ReturnType<typeof setInterval> | 0 = 0;


// (document.getElementById("canvas"))!.addEventListener("click", () => {
//     if (timer) stop(); else run();
// });

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