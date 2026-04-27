import Space from "./models/space";
import { show } from "./view/view";


const n = 1000;      // total area
const n_vis = 200;  // visible middle area
const period = 50    // perod in msec

const params = (document.getElementById("params") as HTMLSpanElement)!;
params.innerHTML = `${n}/${n_vis}`

const mid = n / 2 | 0, beg = ( n - n_vis) / 2 | 0, end = beg + n_vis;

let space = new Space(n);

// init state
space.nodes[mid].z = 1
let timer = 0;


(document.getElementById("canvas"))!.addEventListener("click", () => {
    if (timer) stop(); else run();
})

function stop() {
    clearInterval(timer);
    timer = 0;
}

function run() {
    timer = setInterval(() => {
        space.step();
        show(space, n_vis);
        if (space.nodes[1].z > 0) {
            stop(); 
        }
    }, period);
}